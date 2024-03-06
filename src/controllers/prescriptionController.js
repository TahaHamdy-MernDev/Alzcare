const PrescriptionModel = require("../models/prescriptionModel");
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const {
  uploadAndSet,
  deleteOldFiles,
  updateFiles,
} = require("../utils/cloudinary");
exports.getAllPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await dbService.findMany(PrescriptionModel, {
    user: req.params.id,
  });
  res.success({ data: prescriptions });
});
exports.getPrescriptionById = asyncHandler(async (req, res) => {
  const prescription = await dbService.findOne(PrescriptionModel, {
    _id: req.params.id,
  });
  if (!prescription) {
    return res.recordNotFound("Prescription");
  }
  res.success({ data: prescription });
});
exports.createPrescription = asyncHandler(async (req, res) => {
  await uploadAndSet(req, "prescriptionImage");
  const data = { ...req.body, user: req.user._id };
  const prescription = await dbService.create(PrescriptionModel, data);
  res.success({ data: prescription });
});
exports.updatePrescription = asyncHandler(async (req, res) => {
  const prescriptionToUpdate = await dbService.findOne(PrescriptionModel, {
    _id: req.params.id,
  });
  if (!prescriptionToUpdate) {
    return res.recordNotFound("Prescription");
  }
  await updateFiles(req, prescriptionToUpdate, "prescriptionImage");
  const updatedPrescription = await dbService.updateOne(
    PrescriptionModel,
    prescriptionToUpdate._id,
    { ...req.body }
  );
  res.success({ data: updatedPrescription });
});

exports.deletePrescription = asyncHandler(async (req, res) => {
  const deletedPrescription = await dbService.deleteOne(PrescriptionModel, {
    _id: req.params.id,
  });
  if (!deletedPrescription) {
    return res.recordNotFound("Prescription");
  }
  await deleteOldFiles(deletedPrescription, "prescriptionImage");
  res.success({ data: req.params.id });
});
