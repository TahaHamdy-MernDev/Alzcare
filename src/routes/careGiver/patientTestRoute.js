const router = require("express").Router();
const idValidator = require("../../utils/idValidator");
const { CareGiver } = require("../../middlewares/auth");
const { validateRequestParameters } = require("../../utils/validate");
const { upload } = require("../../utils/upload");
const testPatientController = require("../../controllers/careGiver/patientTestController");
const {
  testSchemaKeys,
  updateTestSchema,
} = require("../../utils/validation/testValidation");

router.get("/get-all-patient-tests", testPatientController.getAllPatientTests);
router.post(
  "/create-patient-test",
  upload.fields([{ name: "testImage", maxCount: 1 }]),
  validateRequestParameters(testSchemaKeys),
  testPatientController.createPatientTest
);
router.get(
  "/get-patient-test/:id",
  idValidator,
  testPatientController.getPatientTest
);
router.put(
  "/update-patient-test/:id",
  idValidator,
  upload.fields([{ name: "testImage", maxCount: 1 }]),
  validateRequestParameters(updateTestSchema),
  testPatientController.updatePatientTest
);
router.delete(
  "/delete-patient-test/:id",
  idValidator,
  testPatientController.deletePatientTest
);

module.exports = router;
