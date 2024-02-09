const commonUtils = require("../utils/common");
const databaseService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const UserModel = require("../models/userModel");
const ResetPasswordModel = require("../models/resetPasswordModel");
const { sendMail } = require("../services/email");
const bcrypt = require("bcrypt");

/**
 * Handles the forgot password functionality.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the function is done.
 */


exports.forgotPassword = asyncHandler(async (req, res) => {
    // Get the email address entered by the user
    const { mail } = req.body;

    // Retrieve the user object from the database
    const user = await databaseService.findOne(UserModel, { mail });

    if (!user) {
        return res.recordNotFound({ message: "There is no user with this email...!" });
    }

    // Retrieve the verification code object from the database
    const verificationCode = await databaseService.findOne(ResetPasswordModel, { user: user._id });

    if (verificationCode) {
        // Calculate the expiration time for the verification code
        const expirationTime = new Date(verificationCode.createdAt.getTime() + 300 * 1000);

        // Get the current time
        const currentTime = new Date();

        // Calculate the remaining minutes until the verification code expires
        let remainingMinutes = commonUtils.getDifferenceOfTwoDatesInTime(currentTime, expirationTime);

        return res.failure({ message: `You can send the code again after: ${remainingMinutes}` });
    }

    // Generate a random verification code
    let code = commonUtils.randomNumber();

    // Create the mail object containing the email details
    let mailObj = {
        subject: 'Your Password!',
        to: user.mail,
        template: '/views/email/ResetPassword',
        data: { code: code, userName: user.Uname }
    };

    await sendMail(mailObj);
    await databaseService.create(ResetPasswordModel, { user: user._id, verification_code: code });
    res.success({ message: "Check your mail for the code...!" });
});

/**
 * Check the verification code provided by the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the code is checked.
 */
exports.checkCode = asyncHandler(async (req, res) => {
    // Find the verification code in the database
    const verificationCode = await databaseService.findOne(ResetPasswordModel, { verification_code: req.body.code });

    // If the verification code is not found, return a "record not found" response
    if (!verificationCode) {
        return res.recordNotFound({ message: "Your code has expired..!" });
    }

    // If the verification code is found, return a success response with the user ID
    res.success({ data: { userId: verificationCode.user } });
});


/**
 * Resets the password for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the password is reset.
 */
exports.resetPassword = asyncHandler(async (req, res) => {
    // Get the new password from the request body
    const { password } = req.body;
    // Find the user by their ID
    const user = await databaseService.findOne(UserModel, { _id: req.params.userId });
    if (!user) {
        // If the user is not found, return a "record not found 404" error
        return res.recordNotFound({ message: "Your code has expired" });
    }
    // Hash the new password
    const hash = await bcrypt.hash(password, 12);
    // Set the user's password to the hashed password
    user.password = hash;
    // Save the user with the updated password
    await user.save();
    // Return a success message
    res.success({ message: "User successfully changed his password" });
});

