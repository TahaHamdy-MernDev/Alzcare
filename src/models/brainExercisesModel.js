const mongoose = require('mongoose');

const brainExerciseSchema = new mongoose.Schema({
  exercise_id: {
    type: String,
    required: true,
    unique: true
  },
  exercise_type: {
    type: String,
    required: true
  },
  performance_feedback: {
    type: String
  },
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('BrainExercise', brainExerciseSchema);