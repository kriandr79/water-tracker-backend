import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";
import hashing from "../helpers/hashing.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const avatarDir = path.join(
  dirname(fileURLToPath(import.meta.url)),
  "../",
  "public",
  "avatars"
);

const addAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatar = await Jimp.read(resultUpload);
  const resizedAvatar = await avatar.resize(250, 250);
  await resizedAvatar.write(resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

const getCurrentInfo = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);

  const { email, name, avatarURL, waterRate, gender } = user;

  res
    .status(200)
    .json({ email, name, avatarURL, dailyNorma: waterRate, gender });
};

const changeCurrentInfo = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  const {
    email = user.email,
    name = user.name,
    oldPassword,
    newPassword,
    gender = user.gender,
  } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) throw HttpError(409, "Email already registered");

  const condition = newPassword !== undefined && oldPassword !== undefined;

  if (condition) {
    const passwordCompare = await hashing.comparePasswords(
      oldPassword,
      user.password
    );

    if (!passwordCompare) {
      throw HttpError(401, "The current password is wrong");
    }

    const hashPassword = await hashing.hashPassword(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashPassword });
  }

  await User.findByIdAndUpdate(id, {
    email,
    name,
    gender,
  });

  res.status(200).json({
    message: "Updated successfully",
    email,
    name,
    gender,
  });
};

export default {
  addAvatar: ctrlWrapper(addAvatar),
  getCurrentInfo: ctrlWrapper(getCurrentInfo),
  changeCurrentInfo: ctrlWrapper(changeCurrentInfo),
};
