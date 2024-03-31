import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const waterEntry = ctrlWrapper(async (req, res, next) => {
	const _id = req.user.id;
	const { value } = req.body;

	// Перевірка на макс/мін води
	if (value < 50 || value > 15000) {
		throw HttpError(400, "Invalid water value");
	}

	const updatedUser = await User.findOneAndUpdate({ _id }, { waterRate });

	if (updatedUser === null) {
		throw HttpError(404, "Not found");
	}

	// оновити таблицю записів споживання води враховуючи нову норму! (якщо змінилась?)

	res.status(200).json({ waterRate });
});

export default { waterEntry };
