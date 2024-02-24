
const mongoose = require('mongoose');

const medicationAlarmSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  timeToUse: {
    type: [Date],
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  timeToStop: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('MedicationAlarm', medicationAlarmSchema);