const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
    default: " ",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  waterTrack: {
    type: String,
    default: " ",
  },
  dailyUse: {
    amount: {
      type: String,
      default: " ",
    },
    time: {
      type: Number,
      default: 0,
    },
  },
});
userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
