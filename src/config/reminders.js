const MedicationReminderModel = require("../models/MedicationReminderModel");
const NotificationModel = require("../models/notificationModel");
const { createAndSaveNotification } = require("../utils/notificationHelper");
const { getUserSocketId } = require("../utils/socketManager");
const admin = require('./firebase/firebase')
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


async function findAndNotifyReminders() {
  const now = new Date();
  const dayOfWeek = getDayOfWeekInArabic(now);
  const currentTime = now.toTimeString().slice(0, 5);
  const reminders = await MedicationReminderModel.find({
    daysOfWeek: dayOfWeek,
    times: currentTime,
  }).populate("user");

  reminders.forEach(async (reminder) => {
    const message = `Time to take your medication: ${reminder.medicationName}`;
    const userId = reminder.user._id.toString();

 
    const notification = new NotificationModel({
      user: reminder.user,
      message: message,
    });
    await notification.save();
    const payload = {
      notification: {
        title: 'Medication Reminder',
        body: message,
      },
      token: reminder.user.deviceToken, 
    };

    admin.messaging().send(payload)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  });
}

module.exports = { findAndNotifyReminders };
// async function findAndNotifyReminders(io) {
//   const now = new Date();
//   const dayOfWeek = getDayOfWeekInArabic(now);
//   const currentTime = now.toTimeString().slice(0, 5);
//   const reminders = await MedicationReminderModel.find({
//     daysOfWeek: dayOfWeek,
//     times: currentTime,
//   }).populate("user");

// await Promise.all(reminders.map(async (reminder) => {
//   const message = `Time to take your medication: ${reminder.medicationName}`;
//   const userId = reminder.user._id.toString();
//   const caregiverId = reminder.user.caregiverId;
//   if (caregiverId) {
//     const caregiverMessage = `Reminder for your patient to take medication: ${reminder.medicationName}`;
//     await createAndSaveNotification(caregiverId, caregiverMessage);
//     const caregiverSocketId = getUserSocketId(caregiverId);
//     if (caregiverSocketId && io) {
//       io.to(caregiverSocketId).emit("medicationReminder", caregiverMessage);
//     } else {
//       console.log(`No active socket for caregiver ${caregiverId}`);
//     }
//   }

//   await createAndSaveNotification(userId, message);

//   const socketId = getUserSocketId(userId);
//   if (socketId && io) {
//     io.to(socketId).emit("medicationReminder", message);
//   } else {
//     console.log(`No active socket for user ${userId}`);
//   }
// }));

//   // reminders.forEach((reminder) => {
//   //   const message = `Time to take your medication: ${reminder.medicationName}`;
//   //   const userId = reminder.user._id.toString();

//   //   const notification = new NotificationModel({
//   //     user: reminder.user,
//   //     message: message,
//   //   });
//   //   notification.save();
//   //   const socketId = userSockets[userId];
//   //   if (socketId && io) {
//   //     io.to(socketId).emit("medicationReminder", message);
//   //   } else {
//   //     console.log(`No active socket for user ${userId}`); 
//   //   }
//   // });
// }
// async function findAndNotifyReminders() {
//   const now = new Date();
//   const dayOfWeek = getDayOfWeekInArabic(now);
//   const currentTime = now.toTimeString().slice(0, 5);
//   const reminders = await MedicationReminderModel.find({
//     daysOfWeek: dayOfWeek,
//     times: currentTime,
//   }).populate("user");

//   await Promise.all(reminders.map(async (reminder) => {
//     const message = `Time to take your medication: ${reminder.medicationName}`;
//     const userId = reminder.user._id.toString();
//     const userDeviceToken = reminder.user.deviceToken;
//     const caregiverId = reminder.user.deviceToken;

//     if (caregiverId) {
//       const caregiverMessage = `Reminder for your patient to take medication: ${reminder.medicationName}`;
//       await createAndSaveNotification(caregiverId, caregiverMessage);
//       const caregiverDeviceToken = reminder.user.caregiverDeviceToken;

//       if (caregiverDeviceToken) {
//         await sendFirebaseNotification(caregiverDeviceToken, 'Medication Reminder', caregiverMessage);
//       } else {
//         console.log(`No FCM token for caregiver ${caregiverId}`);
//       }
//     }

//     await createAndSaveNotification(userId, message);

//     if (userDeviceToken) {
//       await sendFirebaseNotification(userDeviceToken, 'Medication Reminder', message);
//     } else {
//       console.log(`No FCM token for user ${userId}`);
//     }
//   }));
// }
// module.exports = { findAndNotifyReminders };