import express from "express";
import validateBody from "../helpers/validateBody.js";
// import {... } from "../controllers/authControllers.js";
// import { ... } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

// роути

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

export default authRouter;
