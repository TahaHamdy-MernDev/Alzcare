const dbService = require("../../utils/dbService");
const asyncHandler = require("../../utils/asyncHandler");
const medicalDetailsModel = require("../../models/medicalDetailsModel");

exports.getAllPatientMedicalDetails = asyncHandler(async (req, res) => {
  let query = { user: req.user.patient };
  const medicalDetails = await dbService.findMany(medicalDetailsModel, query);
  res.success({ data: medicalDetails });
});

exports.createPatientMedicalDetails = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user.patient };
  const medicalDetails = await dbService.create(medicalDetailsModel, data);
  res.success({ data: medicalDetails });
});


exports.getPatientMedicalDetails = asyncHandler(async (req, res) => {
  const medicalDetails = await dbService.findOne(medicalDetailsModel, { _id: req.params.id })
  if(!medicalDetails){
      return res.recordNotFound('Medical Details')
  }
  res.success({ data: medicalDetails })
})
exports.updatePatientMedicalDetails = asyncHandler(async (req, res) => {
  const updatedMedicalDetails = await dbService.updateOne(medicalDetailsModel, { _id: req.params.id }, { ...req.body })
  if (!updatedMedicalDetails) {
    return  res.recordNotFound('MedicalDetails')
  }
  res.success({ data: updatedMedicalDetails })
})
exports.deletePatientMedicalDetails = asyncHandler(async (req, res) => {
  const deletedMedicalDetails = await dbService.deleteOne(medicalDetailsModel, { _id: req.params.id })
  if (!deletedMedicalDetails) {
    return  res.recordNotFound('MedicalDetails')
  }
  res.success({ data: deletedMedicalDetails._id })
})