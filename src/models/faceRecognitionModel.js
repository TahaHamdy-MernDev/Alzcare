const mongoose = require('mongoose');

const faceRecognitionSchema = new mongoose.Schema({
  faceRecognition_ID: {
    type: String,
    required: true,
    unique: true
  },
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('FaceRecognition', faceRecognitionSchema);