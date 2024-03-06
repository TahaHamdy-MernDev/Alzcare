const Joi = require("joi");

const createMedicalDetailsSchema = Joi.object({
  bloodType: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "string.base": "Blood type must be a string.",
      "any.only": "Blood type must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.",
      "any.required": "Blood type is a required field.",
    }),
  sensitivities: Joi.string().required().messages({
    "any.required": "Sensitivities is a required field.",
    "string.base": "Sensitivities must be a string.",
  }),
  chronicDiseases: Joi.string().required().messages({
    "any.required": "Chronic diseases is a required field.",
    "string.base": "Chronic diseases must be a string.",
  }),
  permanentMedications: Joi.boolean().messages({
    "any.required": "Permanent medications is a required field.",
    "boolean.base": "Permanent medications must be true or false.",
  }),
  medications: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "Medication name must be a string.",
          "string.empty": "Medication name cannot be empty.",
          "any.required": "Medication name is a required field.",
        }),
      })
    )
    .messages({
      "array.base": "Medications must be an array.",
    }),
});

const updateMedicalDetailsSchema = createMedicalDetailsSchema.fork(
  [
    "bloodType",
    "sensitivities",
    "chronicDiseases",
    "permanentMedications",
    "medications",
  ],
  (schema) => schema.optional()
);

module.exports = {
  createMedicalDetailsSchema,
  updateMedicalDetailsSchema,
};
