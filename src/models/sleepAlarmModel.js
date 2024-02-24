
const mongoose = require('mongoose');

const sleepAlarmSchema = new mongoose.Schema({
  bedtime: {
    type: Date,
    required: true,
  },
  wakeupTime: {
    type: Date,
    required: true,
  },
  ringtone: {
    type: String,
    required: true,
  },
  vibration: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('SleepAlarm', sleepAlarmSchema);