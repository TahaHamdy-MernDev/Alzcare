const Joi = require("joi");
module.exports = {
  prescriptionKeys: Joi.object({
    date: Joi.string().required().messages({
      "any.required": "Prescription date is required.",
      "string.base": "Date must be a string.",
    }),
    notes: Joi.string().required().messages({
      "any.required": "Notes is required.",
      "string.base": "Notes must be a string.",
    }),
    attendingPhysician: Joi.string().required().messages({
      "any.required": "Attending physician name is required.",
      "string.empty": "Attending physician name cannot be empty.",
    }),
    prescriptionImage: Joi.string(),
  }),
};
