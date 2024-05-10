const router = require("express").Router();
const idValidator = require("../../utils/idValidator");
const { authenticate } = require("../../middlewares/auth");
const { validateRequestParameters } = require("../../utils/validate");
const {
  createMedicalDetailsSchema,
  updateMedicalDetailsSchema,
} = require("../../utils/validation/medicalDetailsValidation");
const medicalDetailsController = require("../../controllers/patient/medicalDetailsController");
router.get(
  "/get-all/:id",
  idValidator,
  medicalDetailsController.getAllMedicalDetails
);
router.post(
  "/",
  authenticate,
  validateRequestParameters(createMedicalDetailsSchema),
  medicalDetailsController.createMedicalDetails
);

router
  .route("/:id", idValidator)
  .get(medicalDetailsController.getMedicalDetails)
  .put(
    validateRequestParameters(updateMedicalDetailsSchema),
    medicalDetailsController.updateMedicalDetails
  )
  .delete(medicalDetailsController.deleteMedicalDetails);
module.exports = router;
