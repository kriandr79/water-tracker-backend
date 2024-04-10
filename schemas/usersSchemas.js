import Joi from "joi";

export const registerUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
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
    .min(8)
    .max(64)
    .required()
    .messages({
      "any.required": "Please provide your email and password",
      "string.alphanum":
        "Please only use numbers and letters for the password.",
      "string.min": "Password must be between 8 and 64 characters long",
      "string.max": "Password must be between 8 and 64 characters long",
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
      tlds: { allow: true },
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
    .min(8)
    .max(64)
    .required()
    .messages({
      "any.required": "Please provide your email and password",
      "string.alphanum":
        "Please only use numbers and letters for the password.",
      "string.min": "Password must be between 8 and 64 characters long",
      "string.max": "Password must be between 8 and 64 characters long",
    }),
})
  .unknown(false)
  .messages({
    "object.missing":
      "Body must have your email and your password as properties of a JSON.",
    "object.unknown":
      "Body cannot have any properties other than email and password",
  });
export const currentChangeSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim()
    .label("Your email")
    .messages({
      "any.required": "Please provide your email",
      "string.email": "Please provide a valid email address",
    }),
  name: Joi.string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .label("Your name")
    .min(1)
    .max(20)
    .messages({
      "any.required": "Please provide your name",
      "string.alphanum": "Please only use numbers and letters for the name.",
      "string.min": "Name must be between 1 and 20 characters long",
      "string.max": "Name must be between 1 and 20 characters long",
    })
    .pattern(new RegExp(".*\\S.*")),
  gender: Joi.string()
    .alphanum()
    .label("Your gender")
    .valid("", "woman", "man"),
  oldPassword: Joi.string()
    .alphanum()
    .label("Your password")
    .min(8)
    .max(64)
    .messages({
      "any.required": "Please provide your outdated password",
      "string.alphanum":
        "Please only use numbers and letters for the password.",
      "string.min": "Password must be between 8 and 64 characters long",
      "string.max": "Password must be between 8 and 64 characters long",
    }),
  newPassword: Joi.string()
    .alphanum()
    .label("Your password")
    .min(8)
    .max(64)
    .messages({
      "any.required": "Please provide your new password",
      "string.alphanum":
        "Please only use numbers and letters for the password.",
      "string.min": "Password must be between 8 and 64 characters long",
      "string.max": "Password must be between 8 and 64 characters long",
    }),
});

export default { registerUserSchema, logInSchema, currentChangeSchema };
