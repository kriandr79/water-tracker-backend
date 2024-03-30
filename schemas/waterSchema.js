import Joi from "joi";

const waterRateSchema = Joi.object({
  waterRate: Joi.number().required().min(50).max(15000),
});

export default { waterRateSchema };
