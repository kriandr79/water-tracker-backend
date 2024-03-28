import express from "express";
import validateBody from "../helpers/validateBody.js";
// import {... } from "../controllers/calendarControllers.js";
// import { ... } from "../schemas/calendarSchemas.js";

const calendarRouter = express.Router();

// роути
// наприклад: calendarRouter.post("/today", validateBody(userSchema), consumptionToday);

export default calendarRouter;
