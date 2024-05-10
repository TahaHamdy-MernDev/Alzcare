const express = require("express");
const router = express.Router();
const prescriptionController = require("../../controllers/careGiver/prescriptionController");
const {
  prescriptionKeys,
} = require("../../utils/validation/prescriptionValidation");
const { validateRequestParameters } = require("../../utils/validate");
const { upload } = require("../../utils/upload");
const idValidator = require("../../utils/idValidator");

router.post(
  "/create-patient-prescription",
  upload.fields([{ name: "prescriptionImage", maxCount: 1 }]),
  validateRequestParameters(prescriptionKeys),
  prescriptionController.createPatientPrescription
);
router.get("/get-all-patient-prescription", prescriptionController.getAllPatientPrescriptions);
router.get("/get-patient-prescription/:id",idValidator, prescriptionController.getPatientPatientPrescriptionById);
router.put(
  "/update-patient-prescription/:id",
  upload.fields([{ name: "prescriptionImage", maxCount: 1 }]),
  validateRequestParameters(prescriptionKeys),
  prescriptionController.updatePatientPrescription
);
router.delete("/delete-patient-prescription/:id", prescriptionController.deletePatientPrescription);

module.exports = router;
