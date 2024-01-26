const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  community_ID: {
    type: String,
    required: true,
    unique: true
  },
  post_ID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  patient_ID: {
    type: String,
    required: true,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('Community', communitySchema);