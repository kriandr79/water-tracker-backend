import Joi from "joi";

export const registerUserSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("Your email")
		.required()
		.messages({
			"any.required": "Please provide your email and password",
			"string.email": "Please provide a valid email address",
		}),
	password: Joi.string()
		.alphanum()
		.label("Your password")
		.min(6)
		.max(30)
		.required()
		.messages({
			"any.required": "Please provide your email and password",
			"string.alphanum":
				"Please only use numbers and letters for the password.",
		}),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have your email and your password as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other than name, email and password",
	});

export const logInSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("Your email")
		.required()
		.messages({
			"any.required": "Please provide your email and password",
			"string.email": "Please provide a valid email address",
		}),
	password: Joi.string()
		.alphanum()
		.label("Your password")
		.min(6)
		.max(30)
		.required()
		.messages({
			"any.required": "Please provide your email and password",
			"string.alphanum":
				"Please only use numbers and letters for the password.",
		}),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have your email and your password as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other than email and password",
	});

export default { registerUserSchema, logInSchema };
