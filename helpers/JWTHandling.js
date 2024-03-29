import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET ?? "super-secret", {
		expiresIn: process.env.JWT_EXPIRES ?? "1d",
	});

const checkToken = (token) => {
	if (!token) throw new HttpError(401, "Not logged in..");

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "super-secret");

		return id;
	} catch (err) {
		throw new HttpError(401, "Not logged in..");
	}
};

export default { checkToken, signToken };
