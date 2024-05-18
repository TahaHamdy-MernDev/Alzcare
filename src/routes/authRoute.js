const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/auth");
const { validateRequestParameters } = require("../utils/validate");
const userSchemaKeys = require("../utils/validation/authValidation");
const router = require("express").Router();
router
  .route("/patient-register")
  .post(
    validateRequestParameters(userSchemaKeys.PatientRegisterKeys),
    authController.PatientRegister
  );
router
  .route("/care-giver-register")
  .post(
    validateRequestParameters(userSchemaKeys.CareGiverRegisterKeys),
    authController.CareGiverRegister
  );
router
  .route("/login")
  .post(
    validateRequestParameters(userSchemaKeys.loginKeys),
    authController.login
  );
router.post('/current-user',authenticate, authController.getCurrentUser)
router.post('/save-token',authenticate, authController.saveDeviceToken)
module.exports = router;