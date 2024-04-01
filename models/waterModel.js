import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

const waterSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	date: {
		type: String,
		// required: true,
	},
	time: {
		type: String,
		// required: true,
	},
	value: {
		type: Number,
		required: [true, "Please enter a number of milliliters consumed"],
	},
	waterRate: {
		type: Schema.Types.Number,
		ref: "User.waterRate",
	},
});
// waterSchema.pre("save", function (next) {
// 	const currentDate = new Date();
// 	this.date = currentDate;
// 	this.time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
// 	next();
// });

waterSchema.post("save", handleMongooseError);

const Water = model("water", waterSchema);

export default Water;
