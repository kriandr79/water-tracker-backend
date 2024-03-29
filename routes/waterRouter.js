import express from "express";
import validateBody from "../helpers/validateBody.js";
import waterRateUpdate from "../controllers/waterRateControllers.js";
// import { ... } from "../schemas/waterSchemas.js";

const waterRouter = express.Router();

waterRouter.post("/rate", auth, validateBody(waterSchema), waterRateUpdate);

export default waterRouter;
