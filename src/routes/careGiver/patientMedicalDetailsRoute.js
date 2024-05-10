const careGiverCtrl = require("../../controllers/careGiver/patientMedicalDetailsController");
const { CareGiver } = require("../../middlewares/auth");
const idValidator = require("../../utils/idValidator");
const { validateRequestParameters } = require("../../utils/validate");
const {
  createMedicalDetailsSchema,
  updateMedicalDetailsSchema,
} = require("../../utils/validation/medicalDetailsValidation");

const router = require("express").Router();
router.get(
  "/get-all-patient-medical-details",
  careGiverCtrl.getAllPatientMedicalDetails
);
router.post(
  "/create-patient-medical-details",
  validateRequestParameters(createMedicalDetailsSchema),
  careGiverCtrl.createPatientMedicalDetails
);
router.get(
  "/get-patient-medical-details/:id",
  idValidator,
  careGiverCtrl.getPatientMedicalDetails
);
router.put(
  "/update-patient-medical-details/:id",
  idValidator,
  validateRequestParameters(updateMedicalDetailsSchema),
  careGiverCtrl.updatePatientMedicalDetails
);
router.delete(
  "/delete-patient-medical-details/:id",
  idValidator,
  careGiverCtrl.deletePatientMedicalDetails
);

module.exports = router;
