const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  photo_id: {
    type: String,
    required: true,
    unique: true
  },
  photo_url: {
    type: String,
    required: true
  },
  recognized_person_name: {
    type: String
  },
  recognized_person_profile_details: {
    type: String
  },
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('Photo', photoSchema);