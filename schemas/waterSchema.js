import Joi from "joi";

const waterRateSchema = Joi.object({
	waterRate: Joi.number().required().min(50).max(15000),
});

const waterEntrySchema = Joi.object({
	value: Joi.number().required().min(50).max(15000),
});

export default { waterRateSchema, waterEntrySchema };
