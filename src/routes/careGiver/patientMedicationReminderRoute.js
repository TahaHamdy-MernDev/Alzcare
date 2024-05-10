const router = require("express").Router();
const idValidator = require("../../utils/idValidator");
const { CareGiver } = require("../../middlewares/auth");
const { validateRequestParameters } = require("../../utils/validate");
const {
  createMedicationReminderSchema,
  updateMedicationReminderSchema,
} = require("../../utils/validation/medicationReminderValidation");
const PatientMedicationRemindersController = require("../../controllers/careGiver/patientMedicationReminder");
router.get(
  "/get-all-patient-medication-reminders",
  PatientMedicationRemindersController.getAllPatientMedicationReminders
);
router.post(
  "/create-patient-medication-reminder",
  validateRequestParameters(createMedicationReminderSchema),
  PatientMedicationRemindersController.createPatientMedicationReminder
);
router.get(
  "/get-patient-medication-reminder/:id",
  idValidator,
  PatientMedicationRemindersController.getPatientMedicationReminder
);
router.get(
  "/update-patient-medication-reminder/:id",
  idValidator,
  validateRequestParameters(updateMedicationReminderSchema),
  PatientMedicationRemindersController.updatePatientMedicationReminder
);
router.delete(
  "/delete-patient-medication-reminder/:id",
  idValidator,
  PatientMedicationRemindersController.deletePatientMedicationReminder
);


module.exports = router;
