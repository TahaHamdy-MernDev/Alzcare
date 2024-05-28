const dbService = require("../../utils/dbService");
const asyncHandler = require("../../utils/asyncHandler");
const MedicationReminderModel = require("../../models/MedicationReminderModel");
exports.getAllMedicationReminders = asyncHandler(async (req, res) => {
  const medicationReminders = await dbService.findMany(
    MedicationReminderModel,
    { user: req.params.id }
  );
  res.success({ data: medicationReminders });
});
exports.getMedicationReminder = asyncHandler(async (req, res) => {
  const medicationReminder = await dbService.findOne(MedicationReminderModel, {
    _id: req.params.id,
  });
  if (!medicationReminder) {
    return res.recordNotFound("Medication Reminder");
  }
  res.success({ data: medicationReminder });
});
exports.createMedicationReminder = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user._id };
  if (req.body.usageSchedule === "يوميا") {
    req.body.daysOfWeek = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
  }
  const medicationReminder = await dbService.create(
    MedicationReminderModel,
    data
  );
  res.success({ data: medicationReminder });
});
exports.updateMedicationReminder = asyncHandler(async (req, res) => {
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

exports.deleteMedicationReminder = asyncHandler(async (req, res) => {
  const deletedMedicationReminder = await dbService.deleteOne(
    MedicationReminderModel,
    { _id: req.params.id }
  );
  if (!deletedMedicationReminder) {
    return res.recordNotFound("Medication Reminder");
  }
  res.success({ data: deletedMedicationReminder._id });
});
