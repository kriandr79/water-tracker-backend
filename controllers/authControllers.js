import User from "../models/userModel.js";

import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/Wraps.js";

const registerUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const isPresent = await User.findOne({ email });
	if (isPresent) throw HttpError(409, "Email already registered");

	// const finalPassword = await hashPassword(password);
	// І передати у створення юзера

	const newUser = await createNewUser({
		...req.body,
	});

	res.status(201).json({
		user: { email: newUser.email, subscription: newUser.subscription },
		token: null,
	});

	// const verificationToken = signToken(newUser._id);

	// newUser.token = verificationToken;
	// await newUser.save();

	// res.status(201).json({
	// 	user: { email: newUser.email, subscription: newUser.subscription },
	// 	token: verificationToken,
	// });
});

export default { registerUser };
