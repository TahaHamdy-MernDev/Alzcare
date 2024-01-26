const Joi = require("joi");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
module.exports = {
  PatientRegisterKeys: Joi.object().keys({
    Uname: Joi.string().min(3).max(30).required().messages({
      "string.base": "username must be a string",
      "string.min": "username should have a minimum length of {#limit}",
      "string.max": "username should have a maximum length of {#limit}",
      "any.required": "username is required",
    }),
    mail: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    tel: Joi.string().required().messages({
      "string.base": "Phone number must be a string",
      "any.required": "Phone number is required",
    }),
    password: Joi.string().regex(passwordRegex).required().messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
  CareGiverRegisterKeys: Joi.object().keys({
    Uname: Joi.string().min(3).max(30).required().messages({
      "string.base": "username must be a string",
      "string.min": "username should have a minimum length of {#limit}",
      "string.max": "username should have a maximum length of {#limit}",
      "any.required": "username is required",
    }),
    mail: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    tel: Joi.string().required().messages({
      "string.base": "Phone number must be a string",
      "any.required": "Phone number is required",
    }),
    patientCode:  Joi.string().required().messages({
      "any.required": "patientCode is required",
    }),
    password: Joi.string().regex(passwordRegex).required().messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
  loginKeys: Joi.object().keys({
    mail: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().regex(passwordRegex).required().messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
  forgotPasswordKeys: Joi.object().keys({
    mail: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
  }),
  checkCodeKeys :Joi.object().keys({
    code: Joi.string().required().length(4).messages({
      "string.base": "code must be a string",
      "any.required": "code is required",
    }),
  }),

  resetPasswordKeys: Joi.object().keys({
    password: Joi.string().regex(passwordRegex).required().messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
 
};
/** validation keys and properties of user */
// exports.schemaKeys = Joi.object({
//     email: Joi.string().email(),
//   mobileNo: Joi.number().required(),
//   password: Joi.string().required(),
//   username: Joi.string(),
//   isActive: Joi.boolean(),
//   age: Joi.number(),
//   country: Joi.string(),
//   accountStatus: Joi.boolean(),
//   shippingAddress: Joi.array().items(Joi.object({
//     pincode: Joi.string(),
//     address1: Joi.string(),
//     address2: Joi.string(),
//     landmark: Joi.string(),
//     city: Joi.string(),
//     isDefault: Joi.boolean(),
//     state: Joi.string(),
//     addressType: Joi.string(),
//     fullName: Joi.string(),
//     mobile: Joi.number().min(10).max(10),
//     addressNo: Joi.number(),
//   })),
//   userType: Joi.number().valid(1, 2, 3),
//   gender: Joi.string().valid('Male', 'Female'),
//   seller: Joi.boolean(),
//   cart: Joi.array().items(Joi.string()),
//   wallet: Joi.array().items(Joi.string()),
//   eventsSchema: Joi.array().items(Joi.string()),
//   orderNumber: Joi.array().items(Joi.string()),
//   wishlist: Joi.array().items(Joi.object({
//     productId: Joi.string(),
//   })),
//   loginOTP: Joi.object({
//     code: Joi.string(),
//     expireTime: Joi.date(),
//   }),
//   resetPasswordLink: Joi.object({
//     code: Joi.string(),
//     expireTime: Joi.date(),
//   }),
//   loginRetryLimit: Joi.number(),
//   loginReactiveTime: Joi.date(),
//   ssoAuth: Joi.object({
//     googleId: Joi.string(),
//     facebookId: Joi.string(),
//   }),
//   createdAt: Joi.date(),
//   updatedAt: Joi.date(),
//   }).unknown(true);
