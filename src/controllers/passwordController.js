const commonUtils = require("../utils/common");
const databaseService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const UserModel = require("../models/userModel");
const ResetPasswordModel = require("../models/resetPasswordModel");
const { sendMail } = require("../services/email");
const bcrypt = require("bcrypt");

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { mail } = req.body;
  const user = await databaseService.findOne(UserModel, { mail });

  if (!user) {
    return res.recordNotFound({
      message: "There is no user with this email...!",
    });
  }

  const verificationCode = await databaseService.findOne(ResetPasswordModel, {
    user: user._id,
  });

  if (verificationCode) {
    const expirationTime = new Date(
      verificationCode.createdAt.getTime() + 300 * 1000
    );
    const currentTime = new Date();
    let remainingMinutes = commonUtils.getDifferenceOfTwoDatesInTime(
      currentTime,
      expirationTime
    );
    return res.failure({
      message: `You can send the code again after: ${remainingMinutes}`,
    });
  }

  let code = commonUtils.randomNumber();
  let mailObj = {
    subject: "Your Password!",
    to: user.mail,
    template: "/views/email/ResetPassword",
    data: { code: code, userName: user.Uname },
  };

  await sendMail(mailObj);
  await databaseService.create(ResetPasswordModel, {
    user: user._id,
    verification_code: code,
  });
  res.success({ message: "Check your mail for the code...!" });
});

exports.checkCode = asyncHandler(async (req, res) => {
  const verificationCode = await databaseService.findOne(ResetPasswordModel, {
    verification_code: req.body.code,
  });

  if (!verificationCode) {
    return res.recordNotFound({ message: "Your code has expired..!" });
  }

  res.success({ data: { userId: verificationCode.user } });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await databaseService.findOne(UserModel, {
    _id: req.params.userId,
  });

  if (!user) {
    return res.recordNotFound({ message: "Your code has expired" });
  }

  const hash = await bcrypt.hash(password, 12);
  user.password = hash;
  await user.save();
  res.success({ message: "User successfully changed his password" });
});
