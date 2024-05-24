const { Schema, model } = require("mongoose");

const medicationReminderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medicationName: {
    type: String,
  },
  usageSchedule: {
    type: String,
    enum: ["يوميا", "اسبوعياً", "شهرياً"],
  },
  daysOfWeek: {
    type: [String],
    enum: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
  },
  times: {
    type: [String],
  },
  endDate: {
    type: Date,
  },
},{
  timestamps:true
});

const MedicationReminderModel = model(
  "MedicationReminder",
  medicationReminderSchema
);

module.exports = MedicationReminderModel;
