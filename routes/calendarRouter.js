import express from "express";
import validateBody from "../helpers/validateBody.js";

import auth from "../middleware/auth.js";
import calendarControllers from "../controllers/calendarToday.js";
import calendarMonth from "../controllers/calendarMonthController.js";
import calendarSchemes from "../schemas/calendarSchema.js";

const calendarRouter = express.Router();

// роути
// наприклад: calendarRouter.post("/today", validateBody(userSchema), consumptionToday);
calendarRouter.post(
  "/today",
  auth,
  validateBody(calendarSchemes.todaySchema),
  calendarControllers.countWaterUseToday
);
calendarRouter.post(
  "/month",
  auth,
  validateBody(calendarSchemes.calendarMonthSchema),
  calendarMonth
);

export default calendarRouter;
