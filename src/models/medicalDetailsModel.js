const { Schema, model } = require("mongoose");

const medicalDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  sensitivities: {
    type: String,
  },
  chronicDiseases: {
    type: String,
  },
  permanentMedications: {
    type: Boolean,
  },
  medications: [
    {
      name: String,
    },
  ],
});

const medicalDetailsModel = model("MedicalDetails", medicalDetailsSchema);
module.exports = medicalDetailsModel;
