import express from "express";
import validateBody from "../helpers/validateBody.js";
import calendarMonth from "../controllers/calendarMonthController.js";
import auth from "../middleware/auth.js";
import calendarMonthSchema from "../schemas/calendarSchema.js";

const calendarRouter = express.Router();

// роути
calendarRouter.get("/month", auth, validateBody(calendarMonthSchema), calendarMonth);

export default calendarRouter;
