const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verification_code: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now, 
    expires: 300 // 5 minutes in seconds
  },

},{
  timestamps:true
});
const ResetPassword= mongoose.model('ResetPassword', resetPasswordSchema);
module.exports = ResetPassword