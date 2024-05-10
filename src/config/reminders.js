const MedicationReminderModel = require("../models/MedicationReminderModel");
const NotificationModel = require("../models/notificationModel");
const { createAndSaveNotification } = require("../utils/notificationHelper");
const { getUserSocketId } = require("../utils/socketManager");

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

async function findAndNotifyReminders(io) {
  const now = new Date();
  const dayOfWeek = getDayOfWeekInArabic(now);
  const currentTime = now.toTimeString().slice(0, 5);
  const reminders = await MedicationReminderModel.find({
    daysOfWeek: dayOfWeek,
    times: currentTime,
  }).populate("user");

await Promise.all(reminders.map(async (reminder) => {
  const message = `Time to take your medication: ${reminder.medicationName}`;
  const userId = reminder.user._id.toString();
  const caregiverId = reminder.user.caregiverId;
  if (caregiverId) {
    const caregiverMessage = `Reminder for your patient to take medication: ${reminder.medicationName}`;
    await createAndSaveNotification(caregiverId, caregiverMessage);
    const caregiverSocketId = getUserSocketId(caregiverId);
    if (caregiverSocketId && io) {
      io.to(caregiverSocketId).emit("medicationReminder", caregiverMessage);
    } else {
      console.log(`No active socket for caregiver ${caregiverId}`);
    }
  }

  await createAndSaveNotification(userId, message);

  const socketId = getUserSocketId(userId);
  if (socketId && io) {
    io.to(socketId).emit("medicationReminder", message);
  } else {
    console.log(`No active socket for user ${userId}`);
  }
}));

  // reminders.forEach((reminder) => {
  //   const message = `Time to take your medication: ${reminder.medicationName}`;
  //   const userId = reminder.user._id.toString();

  //   const notification = new NotificationModel({
  //     user: reminder.user,
  //     message: message,
  //   });
  //   notification.save();
  //   const socketId = userSockets[userId];
  //   if (socketId && io) {
  //     io.to(socketId).emit("medicationReminder", message);
  //   } else {
  //     console.log(`No active socket for user ${userId}`); 
  //   }
  // });
}

module.exports = { findAndNotifyReminders };