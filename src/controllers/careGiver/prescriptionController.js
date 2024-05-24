const PrescriptionModel = require("../../models/prescriptionModel");
const asyncHandler = require("../../utils/asyncHandler");
const { uploadAndSet, updateFiles, deleteOldFiles } = require("../../utils/cloudinary");
const dbService = require("../../utils/dbService");

exports.getAllPatientPrescriptions = asyncHandler(async (req, res) => {
  const filter = { user: req.user.patient };
  const prescriptions = await dbService.findMany(PrescriptionModel, filter);
  res.success({ data: prescriptions });
});
exports.getPatientPatientPrescriptionById = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id};
  const prescription = await dbService.findOne(PrescriptionModel, filter);
  if (!prescription) {
    return res.recordNotFound("Prescription");
  }
  res.success({ data: prescription });
});
exports.createPatientPrescription = asyncHandler(async (req, res) => {
  await uploadAndSet(req, "prescriptionImage");
 
  const data = { ...req.body, user: req.user.patient };
  const prescription = await dbService.create(PrescriptionModel, data);
  res.success({ data: prescription });
});
exports.updatePatientPrescription = asyncHandler(async (req, res) => {
    const filter = { _id : req.params.id}
  const prescriptionToUpdate = await dbService.findOne(PrescriptionModel,filter);
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

exports.deletePatientPrescription = asyncHandler(async (req, res) => {
    const filter = { _id : req.params.id}
  const deletedPrescription = await dbService.deleteOne(PrescriptionModel,filter);
  if (!deletedPrescription) {
    return res.recordNotFound("Prescription");
  }
  await deleteOldFiles(deletedPrescription, "prescriptionImage");
  res.success({ data: req.params.id });
});
