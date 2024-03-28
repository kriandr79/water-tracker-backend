import express from "express";
import validateBody from "../helpers/validateBody.js";
// import {... } from "../controllers/waterControllers.js";
// import { ... } from "../schemas/waterSchemas.js";

const waterRouter = express.Router();

// роути
// наприклад: waterRouter.post("/register", validateBody(waterSchema), register);

export default waterRouter;
