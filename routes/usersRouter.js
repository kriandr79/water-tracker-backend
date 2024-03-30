import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import {
  addAvatar,
  getCurrentInfo,
  changeCurrentInfo,
} from "../controllers/user.js";

// import authenticate from "../middleware"
// import {... } from "../controllers/usersControllers.js";
// import { ... } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

// роути
// наприклад: usersRouter.post("/avatar", validateBody(userSchema), uploadAvatar);
usersRouter.get("/current", auth, getCurrentInfo);
usersRouter.post("/avatar", auth, upload.single("avatar"), addAvatar);
usersRouter.patch("/current", auth, changeCurrentInfo);

export default usersRouter;
