const { Schema, model } = require("mongoose");

const prescriptionSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  attendingPhysician: {
    type: String,
    required: true
  },
  prescriptionImage: {
    type: Object,
    default: {
      url: "",
      publicId: null
    }
  }
});

const PrescriptionModel = model('Prescription', prescriptionSchema);
module.exports = PrescriptionModel