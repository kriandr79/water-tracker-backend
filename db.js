import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log("Connection error", error);
    process.exit(1);
  });
