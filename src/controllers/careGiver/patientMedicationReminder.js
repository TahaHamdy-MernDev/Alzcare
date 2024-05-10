const dbService = require("../../utils/dbService");
const asyncHandler = require("../../utils/asyncHandler");
const MedicationReminderModel = require("../../models/MedicationReminderModel");
exports.getAllPatientMedicationReminders = asyncHandler(async (req, res) => {
  const filter = { user: req.user.patient };
  const medicationReminders = await dbService.findMany(
    MedicationReminderModel,
    filter
  );
  res.success({ data: medicationReminders });
});
exports.getPatientMedicationReminder = asyncHandler(async (req, res) => {
  const medicationReminder = await dbService.findOne(MedicationReminderModel, {
    _id: req.params.id,
  });
  if (!medicationReminder) {
    return res.recordNotFound("Medication Reminder");
  }
  res.success({ data: medicationReminder });
});
exports.createPatientMedicationReminder = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user.patient };
  const medicationReminder = await dbService.create(
    MedicationReminderModel,
    data
  );
  res.success({ data: medicationReminder });
});
exports.updatePatientMedicationReminder = asyncHandler(async (req, res) => {
  const updatedMedicationReminder = await dbService.updateOne(
    MedicationReminderModel,
    { _id: req.params.id },
    { ...req.body }
  );
  if (!updatedMedicationReminder) {
    return res.recordNotFound("Medication Reminder");
  }
  res.success({ data: updatedMedicationReminder });
});

exports.deletePatientMedicationReminder = asyncHandler(async (req, res) => {
  const deletedMedicationReminder = await dbService.deleteOne(
    MedicationReminderModel,
    { _id: req.params.id }
  );
  if (!deletedMedicationReminder) {
    return res.recordNotFound("Medication Reminder");
  }
  res.success({ data: deletedMedicationReminder._id });
});
