const router = require("express").Router();
const idValidator = require("../../utils/idValidator");
const { authenticate } = require("../../middlewares/auth");
const { validateRequestParameters } = require("../../utils/validate");
const medicationReminderController = require("../../controllers/patient/medicationReminderController");
const {
  createMedicationReminderSchema,
  updateMedicationReminderSchema,
} = require("../../utils/validation/medicationReminderValidation");
router.get(
  "/get-all/:id",
  idValidator,
  medicationReminderController.getAllMedicationReminders
);
router.post(
  "/",
  authenticate,
  validateRequestParameters(createMedicationReminderSchema),
  medicationReminderController.createMedicationReminder
);

router
  .route("/:id", idValidator)
  .get(medicationReminderController.getMedicationReminder)
  .put(
    validateRequestParameters(updateMedicationReminderSchema),
    medicationReminderController.updateMedicationReminder
  )
  .delete(medicationReminderController.deleteMedicationReminder);

module.exports = router;
