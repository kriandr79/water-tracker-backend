import express from "express";
import validateBody from "../helpers/validateBody.js";
// import {... } from "../controllers/usersControllers.js";
// import { ... } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

// роути
// наприклад: usersRouter.post("/avatar", validateBody(userSchema), uploadAvatar);

export default usersRouter;