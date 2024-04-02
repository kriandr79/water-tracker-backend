import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const calendarMonth = ctrlWrapper(async (req, res, next) => {
  const owner = req.user.id;
  const { month, year } = req.body;

  const drinks = [
    { day: 1, waterRate: 2000, ml: 100 },
    { day: 1, waterRate: 2000, ml: 100 },
    { day: 1, waterRate: 2000, ml: 100 },
    { day: 1, waterRate: 2000, ml: 100 },
    { day: 2, waterRate: 4000, ml: 400 },
    { day: 2, waterRate: 4000, ml: 400 },
    { day: 2, waterRate: 4000, ml: 300 },
    { day: 2, waterRate: 4000, ml: 400 },
    { day: 4, waterRate: 1000, ml: 500 },
    { day: 4, waterRate: 1000, ml: 500 },
    { day: 4, waterRate: 1000, ml: 500 },
    { day: 4, waterRate: 1000, ml: 500 },
    { day: 5, waterRate: 5000, ml: 1400 },
  ];

  try {
    const user = await User.findOne({ _id: owner }, { waterRate: 1 }); // беремо норму води юзера
    const userDefaultWaterRate = user.waterRate;

    const daysInMarch = new Date(year, month, 0).getDate(); // Кількість днів в обраному місяці
    const summary = {};

    for (let day = 1; day <= daysInMarch; day++) {
      const date = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0, поэтому уменьшаем на 1
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      const filteredDrinks = drinks.filter((item) => item.day === day);
      const count = filteredDrinks.length;
      const dayWaterRate =
        count > 0 ? filteredDrinks[0].waterRate : user.waterRate; // дневная норма по умолчанию как установлена у юзера
      const totalMl = filteredDrinks.reduce((acc, cur) => acc + cur.ml, 0);
      const percent = (totalMl * 100) / dayWaterRate;

      summary[day] = {
        dayNumber,
        formattedDate,
        dayWaterRate,
        count,
        totalMl,
        percent,
      };
    }

    console.log(summary);

    // const daysInMonth = new Date(year, month, 0).getDate(); // Получаем количество дней в указанном месяце

    // const daysInMonthArray = [];

    // for (let day = 1; day <= daysInMonth; day++) {
    //   const date = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0, поэтому уменьшаем на 1

    //   const dayObject = {
    //     day: date.getDate(),
    //     month: date.getMonth() + 1, // Добавляем 1, так как месяцы начинаются с 0
    //     year: date.getFullYear(),
    //   };

    //   daysInMonthArray.push(dayObject);
    // }

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }



  // const summary = drinks.reduce((acc, cur) => {
  //   const { waterRate, day, ml } = cur;
  //   acc[day] = acc[day] || { count: 0, waterRate, totalMl: 0 };
  //   acc[day].count++;
  //   acc[day].totalMl += ml;
  //   acc[day].percent = (acc[day].totalMl * 100) / waterRate;
  //   return acc;
  // }, {});

  //

  // Вертає
  // [{date, waterRate, procent, drinksQuantity}]
  //
  //
  //
});

export default calendarMonth;
