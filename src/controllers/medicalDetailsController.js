const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const medicalDetailsModel = require("../models/medicalDetailsModel");

exports.getAllMedicalDetails = asyncHandler(async (req, res) => {
    const medicalDetails = await dbService.findMany(medicalDetailsModel, { user: req.params.id })
    res.success({ data: medicalDetails })
})
exports.createMedicalDetails = asyncHandler(async (req, res) => {
    const data = { ...req.body, user: req.user._id }
    const medicalDetails = await dbService.create(medicalDetailsModel, data)
    res.success({ data: medicalDetails })
})
exports.getMedicalDetails = asyncHandler(async (req, res) => {
    const medicalDetails = await dbService.findOne(medicalDetailsModel, { _id: req.params.id })
    if(!medicalDetails){
        return res.recordNotFound('Medical Details')
    }
    res.success({ data: medicalDetails })
})
exports.updateMedicalDetails = asyncHandler(async (req, res) => {
    const updatedMedicalDetails = await dbService.updateOne(medicalDetailsModel, { _id: req.params.id }, { ...req.body })
    if (!updatedMedicalDetails) {
      return  res.recordNotFound('MedicalDetails')
    }
    res.success({ data: updatedMedicalDetails })
})
exports.deleteMedicalDetails = asyncHandler(async (req, res) => {
    const deletedMedicalDetails = await dbService.deleteOne(medicalDetailsModel, { _id: req.params.id })
    if (!deletedMedicalDetails) {
      return  res.recordNotFound('MedicalDetails')
    }
    res.success({ data: deletedMedicalDetails._id })
})