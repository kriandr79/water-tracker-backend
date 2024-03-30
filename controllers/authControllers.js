import User from "../models/userModel.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import hashing from "../helpers/hashing.js";
import JWTHandling from "../helpers/JWTHandling.js";

const registerUser = ctrlWrapper(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw HttpError(409, "Email already registered");

	const finalPassword = await hashing.hashPassword(password);
	// const baseName = email.split("@")[0];

	const newUser = await User.create({
		...req.body,
		// name: baseName,
		password: finalPassword,
	});

	const verificationToken = JWTHandling.signToken(newUser._id);

	newUser.token = verificationToken;
	await newUser.save();

	res.status(201).json({
		user: { email: newUser.email, name: newUser.name },
		token: verificationToken,
	});
});

const logInUser = ctrlWrapper(async (req, res) => {
	const { email, password } = req.body;

	const thisUser = await User.findOne({ email });
	if (!thisUser) throw HttpError(401, "Email or password is wrong");

	const isAuthentic = await hashing.comparePasswords(
		password,
		thisUser.password
	);
	if (!isAuthentic) throw HttpError(401, "Email or password is wrong");

	const newToken = await JWTHandling.signToken(thisUser.id);

	const updatedUser = await User.findOneAndUpdate(
		{ _id: thisUser._id },
		{ token: newToken },
		{ returnDocument: "after" }
	);

	res.status(200).json({
		user: { email: updatedUser.email, name: updatedUser.name },
		token: updatedUser.token,
	});
});

const logOutUser = ctrlWrapper(async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json();
});

export default { registerUser, logInUser, logOutUser };
