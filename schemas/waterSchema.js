import Joi from "joi";

const waterRateSchema = Joi.object({
	waterRate: Joi.number().required().min(50).max(15000),
});

const waterEntrySchema = Joi.object({
	value: Joi.number().required().min(50).max(5000).messages({
		"any.required": "Please enter the amount of water consumed at this time",
		"base.number": "Please enter the amount of water consumed as a number",
		"number.max": "You can't consume more than 5000 milliliters at a time",
		"number.min": "You can't consume less than 50 milliliters at a time",
	}),
	date: Joi.string(),
	// .required(),
	time: Joi.string(),
	// .required(),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have your amount of water consumed as a property of a JSON.",
		"object.unknown":
			"Body cannot have any properties other your amount of water consumed, date and time",
	});

const waterEntryEditSchema = Joi.object({
	value: Joi.number().min(50).max(5000).messages({
		"any.required": "Please enter the amount of water consumed at this time",
		"base.number": "Please enter the amount of water consumed as a number",
		"number.max": "You can't consume more than 5000 milliliters at a time",
		"number.min": "You can't consume less than 50 milliliters at a time",
	}),
	time: Joi.string().messages({
		"string.base": "Please enter a string as time",
	}),
})
	.or("value", "time")
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have either your amount of water consumed or time, or both as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other your amount of water consumed and time",
	});

export default { waterRateSchema, waterEntrySchema, waterEntryEditSchema };
