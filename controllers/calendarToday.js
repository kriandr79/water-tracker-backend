import dateHandler from "../helpers/dateHandler.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import User from "../models/userModel.js";
import Water from "../models/waterModel.js";

const countWaterUseToday = async (req, res) => {
	const { id: owner } = req.user;
	const { currentDate = undefined } = req.body;

	const user = await User.findById(owner);

	if (!user) {
		throw HttpError(401, "Not authorized");
	}
	const dailyWaterRate = user.waterRate;

	if (currentDate === undefined) {
		const { date } = dateHandler(new Date());
		const takingWater = await Water.find(
			{ owner, date },
			{ time: 1, value: 1 }
		);
		const totalMl = takingWater.reduce((acc, cur) => acc + cur.value, 0);
		const percent = Math.round((totalMl * 100) / dailyWaterRate);

		res.status(200).json({
			percent,
			date,
			takingWater,
		});
		return;
	}

	const takingWater = await Water.find(
		{ owner, date: currentDate },
		{ time: 1, value: 1 }
	);

	const totalMl = takingWater.reduce((acc, cur) => acc + cur.value, 0);
	const percent = (totalMl * 100) / dailyWaterRate;

	res.status(200).json({
		percent,
		date: currentDate,
		takingWater,
	});
};
export default {
	countWaterUseToday: ctrlWrapper(countWaterUseToday),
};
