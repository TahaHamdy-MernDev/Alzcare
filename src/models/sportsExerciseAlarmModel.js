const { Schema, model } = require("mongoose");

const sportsExerciseAlarmSchema = new Schema({
  exerciseTime: {
    type: Date,
    required: true,
  },
  typeOfExercise: {
    type: String,
    required: true,
  },
  vibration: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

const SportsExerciseAlarmModel = model('SportsExerciseAlarm', sportsExerciseAlarmSchema);
module.exports = SportsExerciseAlarmModel;