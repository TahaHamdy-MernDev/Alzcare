const Joi = require("joi");
const generateEnumErrorMessage = (fieldName, validValues) => {
  return `${fieldName} must be one of ${validValues.join(", ")}.`;
};

const createMedicationReminderSchema = Joi.object({
  medicationName: Joi.string().required().messages({
    "string.base": "Medication name must be a string.",
    "string.empty": "Medication name cannot be empty.",
    "any.required": "Medication name is a required field.",
  }),
  usageSchedule: Joi.string()
    .valid("يوميا", "اسبوعياً", "شهرياً")
    .required()
    .messages({
      "string.base": "Usage schedule must be a string.",
      "any.only": generateEnumErrorMessage("Usage schedule", [
        "يوميا",
        "اسبوعياً",
        "شهرياً",
      ]),
      "any.required": "Usage schedule is a required field.",
    }),
  daysOfWeek: Joi.when("usageSchedule", {
    is: "اسبوعياً",
    then: Joi.array()
      .items(
        Joi.string().valid(
          "الأحد",
          "الاثنين",
          "الثلاثاء",
          "الأربعاء",
          "الخميس",
          "الجمعة",
          "السبت"
        )
      )
      .required()
      .messages({
        "array.base": "Days of week must be an array.",
        "any.required":
          "Days of week are required when usage schedule is weekly.",
        "any.only": generateEnumErrorMessage("Days of week", [
          "الأحد",
          "الاثنين",
          "الثلاثاء",
          "الأربعاء",
          "الخميس",
          "الجمعة",
          "السبت",
        ]),
      }),
    otherwise: Joi.forbidden(),
  }),
  times: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.base": "Times must be an array.",
    "array.min": "Times must contain at least one time.",
    "any.required": "Times is a required field.",
  }),
  endDate: Joi.string().required().messages({
    "any.required": "End Date date is required.",
    "string.base": "End Date must be a string.",
  }),
});

const updateMedicationReminderSchema = createMedicationReminderSchema.fork(
  Object.keys(createMedicationReminderSchema.describe().keys),
  (schema) => schema.optional()
);

module.exports = {
  createMedicationReminderSchema,
  updateMedicationReminderSchema,
};
