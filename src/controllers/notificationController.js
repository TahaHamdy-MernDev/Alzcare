const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const NotificationModel = require("../models/notificationModel");

exports.getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await dbService.findMany(NotificationModel, {
    user: req.user._id,
  });
  res.success({ data: notifications });
});

exports.deleteAllNotifications = asyncHandler(async (req, res) => {
  await dbService.deleteMany(NotificationModel, {
    user: req.user._id,
  });
  res.success();
});
