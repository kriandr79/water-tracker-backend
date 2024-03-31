import express from "express";
import validateBody from "../helpers/validateBody.js";
import waterRateUpdate from "../controllers/waterRateControllers.js";
import waterControllers from "../controllers/waterControllers.js";
import auth from "../middleware/auth.js";
import waterSchema from "../schemas/waterSchema.js";

const waterRouter = express.Router();

waterRouter.post(
	"/rate",
	auth,
	validateBody(waterSchema.waterRateSchema),
	waterRateUpdate
);

waterRouter.post(
	"/",
	auth,
	validateBody(waterSchema.waterRateSchema),
	waterControllers.waterEntry
);

export default waterRouter;
