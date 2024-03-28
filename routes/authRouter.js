import express from "express";
import validateBody from "../helpers/validateBody.js";
// import {... } from "../controllers/authControllers.js";
// import { ... } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

// роути
// наприклад: authRouter.post("/register", validateBody(userSchema), registerUser);

export default authRouter;
