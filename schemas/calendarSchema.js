import Joi from "joi";

const calendarMonthSchema = Joi.object({
  month: Joi.string().required().length(2),
  year: Joi.string().required().length(4),
});

const todaySchema = Joi.object({
  currentDate: Joi.string(),
});
export default { calendarMonthSchema, todaySchema };
