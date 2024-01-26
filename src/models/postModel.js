const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_ID: {
    type: String,
    required: true,
    unique: true
  },
  post_content: {
    type: String,
    required: true
  },
  post_date: {
    type: Date,
    required: true
  },
  notification_updated_date: {
    type: Date
  },
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('Post', postSchema);