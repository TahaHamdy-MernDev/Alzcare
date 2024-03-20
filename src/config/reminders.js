const MedicationReminderModel = require("../models/MedicationReminderModel");
const NotificationModel = require("../models/notificationModel");

function getDayOfWeekInArabic(date) {
  const dayOfWeekEn = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const dayMap = {
    sunday: "الأحد",
    monday: "الاثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت",
  };
  return dayMap[dayOfWeekEn];
}

async function findAndNotifyReminders(io, userSockets) {
  const now = new Date();
  const dayOfWeek = getDayOfWeekInArabic(now);
  const currentTime = now.toTimeString().slice(0, 5);
  const reminders = await MedicationReminderModel.find({
    daysOfWeek: dayOfWeek,
    times: currentTime,
  }).populate("user");
  reminders.forEach((reminder) => {
    const message = `Time to take your medication: ${reminder.medicationName}`;
    const userId = reminder.user._id.toString();

    const notification = new NotificationModel({
      user: reminder.user,
      message: message,
    });
    notification.save();
    const socketId = userSockets[userId];
    if (socketId && io) {
      io.to(socketId).emit("medicationReminder", message);
    } else {
      console.log(`No active socket for user ${userId}`); 
    }
  });
}

module.exports = { findAndNotifyReminders };