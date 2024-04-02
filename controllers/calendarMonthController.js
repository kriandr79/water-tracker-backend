import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";
import Water from "../models/waterModel.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const calendarMonth = ctrlWrapper(async (req, res, next) => {
  const owner = req.user.id;
  const { month, year } = req.body;

  const daysInMonth = new Date(year, month, 0).getDate(); // Кількість днів в обраному місяці
  const summary = {};  // об'єкт результату
  const searchKey = `^[0-9]{2}.${month}.${year}$`; // ключ для пошуку по даті

  try {
    const user = await User.findOne({ _id: owner }, { waterRate: 1 }); // беремо норму води юзера
    const userDefaultWaterRate = user.waterRate;

    const drinks = await Water.find({
      owner,
      date: { $regex: searchKey, $options: "i" },
    }); // беремо дрінки за обраний місяць

    // Створюємо масив днів обраного місяця, та підвязуємо дані по дрінках
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day); // місяць починаєтся 0, зменьшуємо на 1

      // Форматуємо дату дня під тот формат який в базі, та ддя відображення в календарі на фронті
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      const formattedDay = date.toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const filteredDrinks = drinks.filter(
        (item) => item.date === formattedDay
      ); // масив дрінків дня
      const count = filteredDrinks.length; // кількість дрінків за день (довжина масиву)
      const dayWaterRate =
        count > 0 ? filteredDrinks[0].waterRate : userDefaultWaterRate; // якщо є дрінкі за день, беремо норму з них, ящкщо немає ставимо дефотлтне значення
      const totalMl = filteredDrinks.reduce((acc, cur) => acc + cur.value, 0); // кількість спожитої води за день, в мл
      const percent = Math.round((totalMl * 100) / dayWaterRate); // процент спожитої воду від денної норми, округлюємо до цілого значення

      summary[day] = {
        day,
        formattedDay,
        formattedDate,
        dayWaterRate,
        count,
        totalMl,
        percent,
      };
    }

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
});

export default calendarMonth;
