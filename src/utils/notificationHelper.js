const NotificationModel = require('../models/notificationModel');
const dbService = require('./dbService')
const createAndSaveNotification = async (userId, message) => {
  const notification =await dbService.create(NotificationModel,{ user: userId, message })
  await notification.save();
};

module.exports = { createAndSaveNotification };