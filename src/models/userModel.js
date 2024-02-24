const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const { USER_TYPES } = require('../constants/authConstant');
function convertObjectToEnum(obj) {
  const enumArr = [];
  Object.values(obj).map((val) => enumArr.push(val));
  return enumArr;
}
const userSchema = new mongoose.Schema({
  Uname: {
    type: String,
    required: true
  },
  profileImg: {
    type: Object,
    default: {
      url: "https://res.cloudinary.com/dlaphiz77/image/upload/v1707563000/octicon_feed-person-16_poam0y.png",
      publicId: null
    }
  },
  Lname: {
    type: String,
  },
  Fname: {
    type: String,
  },
  Mname: {
    type: String
  },
  tel: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },

  patientCode: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  tokens: {
    type: String
  },
  BDate: {
    type: Date,
  },
  photo_id: {
    type: String,
    ref: 'Photo'
  },
  userType: {
    type: Number,
    enum: convertObjectToEnum(USER_TYPES),
    required: true,
  },
  faceRecognition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FaceRecognition'
  },
  remindersAndTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReminderAndTask'
  }],
  careGiver_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  ]
}, {
  timestamps: true
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
userSchema.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  // object.id = _id;
  delete object.password;

  return object;
});
const User = mongoose.model('User', userSchema);
module.exports = User