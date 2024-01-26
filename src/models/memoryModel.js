const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  memories_ID: {
    type: String,
    required: true,
    unique: true
  },
  memories_date: {
    type: Date,
    required: true
  },
  title_notes: {
    type: String
  },
  description: {
    type: String
  },
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  }
});

module.exports = mongoose.model('Memory', memorySchema);