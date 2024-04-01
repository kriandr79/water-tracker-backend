import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import dateHandler from "../helpers/dateHandler.js";

import User from "../models/userModel.js";
import Water from "../models/waterModel.js";

const waterEntry = ctrlWrapper(async (req, res) => {
	const { id: owner } = req.user;
	const { value } = req.body;

	const currentUser = await User.findById(owner);
	if (currentUser === null) throw HttpError(404, "User not found");

	const { date, time } = dateHandler(new Date());

	const newEntry = await Water.create({
		owner,
		value,
		date,
		time,
		waterRate: currentUser.waterRate,
	});

	res
		.status(200)
		.json({ value: newEntry.value, time: newEntry.time, date: newEntry.date });
});

export default { waterEntry };
