import express from "express";
import validateBody from "../helpers/validateBody.js";
import calendarMonth from "../controllers/calendarMonthController.js";
import auth from "../middleware/auth.js";
// import { ... } from "../schemas/calendarSchemas.js";

const calendarRouter = express.Router();

// роути
calendarRouter.get("/month", auth, calendarMonth);

export default calendarRouter;
