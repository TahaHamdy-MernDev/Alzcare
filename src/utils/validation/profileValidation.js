const Joi = require("joi");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
module.exports = {
  updateProfileKeys: Joi.object().keys({
    Uname: Joi.string().min(3).max(30).allow("").messages({
      "string.base": "username must be a string",
      "string.min": "username should have a minimum length of {#limit}",
      "string.max": "username should have a maximum length of {#limit}",
      "string.empty": "username cannot be empty",
    }),
    mail: Joi.string().email().allow("").messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
    }),
  }),
  changePasswordKeys: Joi.object().keys({
    newPassword: Joi.string().regex(passwordRegex).required().messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
    oldPassword: Joi.string().required().messages({
      "string.base": "Old Password must be Valid",
      "any.required": "Old Password is required",
    }),
  }),
};
