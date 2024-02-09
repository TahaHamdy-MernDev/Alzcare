const passwordController = require("../controllers/passwordController");
const { validateRequestParameters } = require("../utils/validate");
const passwordValidation = require("../utils/validation/authValidation");

const router = require("express").Router();
router
    .route("/forgot-password")
    .post(validateRequestParameters(passwordValidation.forgotPasswordKeys), passwordController.forgotPassword);
router
    .route("/check-code")
    .post(validateRequestParameters(passwordValidation.checkCodeKeys), passwordController.checkCode);
router
    .route("/reset-password/:userId")
    .post(validateRequestParameters(passwordValidation.resetPasswordKeys), passwordController.resetPassword);

module.exports = router; 