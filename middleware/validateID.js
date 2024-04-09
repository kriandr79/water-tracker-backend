import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) throw HttpError(400, `'${id}' is not a valid id`);

	next();
};

export default isValidId;
