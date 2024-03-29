import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import ctrlWrapper from "../helpers/ctrlWrapper";
import HttpError from "../helpers/HttpError";
import User from "../models/userModel";

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const addAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatar = await Jimp.read(resultUpload);
  const resizedAvatar = await avatar.resize(250, 250);
  await resizedAvatar.write(resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

const getCurrentInfo = async (req, res) => {
  const { _id, email, name } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({ email, name });
};

const changeCurrentInfo = async (req, res) => {
  const { _id } = req.user;
};

export default {
  addAvatar: ctrlWrapper(addAvatar),
  getCurrentInfo: ctrlWrapper(getCurrentInfo),
};
