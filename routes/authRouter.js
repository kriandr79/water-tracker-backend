import express from "express";

import validateBody from "../helpers/validateBody.js";
import auth from "../middleware/auth.js";

import authControllers from "../controllers/authControllers.js";

import usersSchemas from "../schemas/usersSchemas.js";

const authRouter = express.Router();

// роути

authRouter.post(
	"/register",
	validateBody(usersSchemas.registerUserSchema),
	authControllers.registerUser
);

authRouter.post(
	"/login",
	validateBody(usersSchemas.logInSchema),
	authControllers.logInUser
);

authRouter.post("/logout", auth, authControllers.logOutUser);

export default authRouter;
