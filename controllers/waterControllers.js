import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import dateHandler from "../helpers/dateHandler.js";

import User from "../models/userModel.js";
import Water from "../models/waterModel.js";

const waterEntry = ctrlWrapper(async (req, res) => {
	const { id: owner } = req.user;
	const { value, date = undefined, time = undefined } = req.body;

	const currentUser = await User.findById(owner);
	if (currentUser === null) throw HttpError(404, "User not found");

	if (date === undefined || time === undefined) {
		const { date, time } = dateHandler(new Date());

		const newEntry = await Water.create({
			owner,
			value,
			date: req.body.date || date,
			time: req.body.time || time,
			waterRate: currentUser.waterRate,
		});

		res.status(201).json({
			value: newEntry.value,
			time: newEntry.time,
			date: newEntry.date,
			id: newEntry._id,
			waterRate: newEntry.waterRate,
		});

		return;
	}

	const newEntry = await Water.create({
		owner,
		value,
		date,
		time,
		waterRate: currentUser.waterRate,
	});

	res.status(201).json({
		value: newEntry.value,
		time: newEntry.time,
		date: newEntry.date,
		id: newEntry._id,
	});
});

const patchEntry = ctrlWrapper(async (req, res) => {
	const { id: owner } = req.user;
	const { value = undefined, time = undefined } = req.body;
	const { id: _id } = req.params;

	const editedEntry = await Water.findOneAndUpdate(
		{ _id, owner },
		{ value, time },
		{ returnDocument: "after", projection: "-__v -owner" }
	);
	if (editedEntry === null) throw HttpError(404, "Entry not found");

	res.status(200).json({
		value: editedEntry.value,
		time: editedEntry.time,
		date: editedEntry.date,
		waterRate: editedEntry.waterRate,
		id: editedEntry._id,
	});

	return;
});

const deleteEntry = ctrlWrapper(async (req, res) => {
	const { id: owner } = req.user;
	const { id: _id } = req.params;

	const deletedEntry = await Water.findOneAndDelete(
		{ _id, owner },
		{ projection: "-__v -owner" }
	);
	if (deletedEntry === null) throw HttpError(404, "Entry not found");

	res.status(200).json({
		value: deletedEntry.value,
		time: deletedEntry.time,
		date: deletedEntry.date,
		waterRate: deletedEntry.waterRate,
		id: deletedEntry._id,
	});

	return;
});

export default { waterEntry, patchEntry, deleteEntry };
