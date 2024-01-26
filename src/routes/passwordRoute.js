const passwordController = require("../controllers/passwordController");
const { validateParamsWithJoi } = require("../utils/validate");
const passwordValidation = require("../utils/validation/authValidation");

const router = require("express").Router();
router
    .route("/forgot-password")
    .post(validateParamsWithJoi(passwordValidation.forgotPasswordKeys), passwordController.ForgotPassword);
router
    .route("/check-code")
    .post(validateParamsWithJoi(passwordValidation.checkCodeKeys), passwordController.CheckCode);
router
    .route("/reset-password/:userId")
    .post(validateParamsWithJoi(passwordValidation.resetPasswordKeys), passwordController.ResetPassword);

module.exports = router; 