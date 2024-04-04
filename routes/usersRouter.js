import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import userControllers from "../controllers/user.js";
import validateBody from "../helpers/validateBody.js";

// import authenticate from "../middleware"
// import {... } from "../controllers/usersControllers.js";
import { currentChangeSchema } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

// роути
// наприклад: usersRouter.post("/avatar", validateBody(userSchema), uploadAvatar);
usersRouter.get("/current", auth, userControllers.getCurrentInfo);
usersRouter.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  userControllers.addAvatar
);
usersRouter.patch(
  "/current",
  auth,
  validateBody(currentChangeSchema),
  userControllers.changeCurrentInfo
);

export default usersRouter;
