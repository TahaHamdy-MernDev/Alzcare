const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { updateFiles } = require("../utils/cloudinary");
exports.changeUserProfileImage = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { _id: req.user._id });
  if (!user) {
    return res.recordNotFound("User");
  }
  await updateFiles(req, user, "profileImg");
  const updatedUser = await dbService.updateOne(
    User,
    { _id: req.user._id },
    { ...req.body }
  );
  if (!updatedUser) {
    return res.recordNotFound("User");
  }
  res.success({ data: updatedUser });
});

exports.editUserProfile = asyncHandler(async (req, res) => {
  const { mail } = req.body;
  const { _id } = req.user;
  if (mail) {
    const userWithSameMail = await dbService.findOne(User, { mail: mail });
    if (userWithSameMail && String(userWithSameMail._id) !== String(_id)) {
      return res.badRequest({ message: "Email already in use" });
    }
  }
  const updatedUser = await dbService.updateOne(User, { _id }, { ...req.body });
  if (!updatedUser) {
    return res.recordNotFound("User");
  }
  res.success({ data: updatedUser });
});

exports.changeOldPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;
  const user = await dbService.findOne(User, { _id });
  if (!user) {
    return res.recordNotFound("User");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.badRequest({ message: "Old password is incorrect" });
  }
  user.password = newPassword;
  await user.save();
  res.success({ message: "Password updated successfully" });
});
