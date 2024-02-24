const { Schema, model } = require("mongoose")
const mealAlarmSchema = new Schema({
  timeOfEating: {
    type: String,
    required: true,
  },
  typeOfFood: {
    type: String,
    required: true,
  },
  quantityOfFood: {
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
const MealAlarmModel = model('MealAlarm', mealAlarmSchema);
module.exports = MealAlarmModel