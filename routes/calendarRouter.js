import express from "express";
import validateBody from "../helpers/validateBody.js";

import auth from "../middleware/auth.js";
import calendarControllers from "../controllers/calendarToday.js";
import calendarMonth from "../controllers/calendarMonthController.js";
import calendarMonthSchema from "../schemas/calendarSchema.js";

const calendarRouter = express.Router();

// роути
// наприклад: calendarRouter.post("/today", validateBody(userSchema), consumptionToday);
calendarRouter.post("/today", auth, calendarControllers.countWaterUseToday);
calendarRouter.post(
  "/month",
  auth,
  validateBody(calendarMonthSchema),
  calendarMonth
);

export default calendarRouter;
