import express from "express";
import upload from "../middleware/upload.js";
import { addAvatar, getCurrentInfo } from "../controllers/user.js";

// import authenticate from "../middleware"
// import {... } from "../controllers/usersControllers.js";
// import { ... } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

// роути
// наприклад: usersRouter.post("/avatar", validateBody(userSchema), uploadAvatar);
usersRouter.get("/current", getCurrentInfo);
usersRouter.post("/avatar", upload.single("avatar"), addAvatar);
usersRouter.patch("/current");

export default usersRouter;
