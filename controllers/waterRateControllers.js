import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";

const waterRateUpdate = async (req, res, next) => {
  const owner = req.user.id;
  const { waterRate } = req.body;

  // Перевірка на макс/мін води
  if (waterRate <= 0 || waterRate > 15000) {
    throw HttpError(400, "Invalid water rate");
  }

  try {
    const updatedUser = await User.findOneAndUpdate({
      _id: owner,
      waterRate,
    });

    // оновити таблицю записів споживання води враховуючи нову норму! (якщо змінилась?)
      
    res.status(200).json({ waterRate });

    if (updatedUser === null) {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export default waterRateUpdate;
