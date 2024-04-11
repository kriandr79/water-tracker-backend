import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

const emailRegexp = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegexp,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["", "woman", "man"],
    default: "",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  waterRate: {
    type: Number,
    default: 2000,
  },
});
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
