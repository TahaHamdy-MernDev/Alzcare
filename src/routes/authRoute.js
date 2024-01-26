const authController = require("../controllers/authController");
const { validateParamsWithJoi } = require("../utils/validate");
const userSchemaKeys = require("../utils/validation/authValidation");
const router = require("express").Router();
router
  .route("/patient-register")
  .post(
    validateParamsWithJoi(userSchemaKeys.PatientRegisterKeys),
    authController.PatientRegister
  );
router
  .route("/care-giver-register")
  .post(
    validateParamsWithJoi(userSchemaKeys.CareGiverRegisterKeys),
    authController.CareGiverRegister
  );
router
  .route("/login")
  .post(
    validateParamsWithJoi(userSchemaKeys.loginKeys),
    authController.login
  );
// router
//   .route("/seller-login")
//   .post(
//     validateParamsWithJoi(userSchemaKeys.loginSellerKeys),
//     authController.loginUser
//   );
module.exports = router;