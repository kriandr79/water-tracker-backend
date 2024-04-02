import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./db.js";

import authRouter from "./routes/authRouter.js";
import waterRouter from "./routes/waterRouter.js";
import usersRouter from "./routes/usersRouter.js";
import calendarRouter from "./routes/calendarRouter.js";


// import swaggerDocument from "./swagger.json" assert { type: "json" };
import { createRequire } from "node:module";
import swaggerUi from "swagger-ui-express";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// routers here
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/water", waterRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

app.listen(3000, () => {
	console.log("Server is running. Use our API on port: 3000");
});
