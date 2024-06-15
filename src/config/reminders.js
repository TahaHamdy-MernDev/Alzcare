const MedicationReminderModel = require("../models/MedicationReminderModel");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notificationService");
const dbService = require("../utils/dbService");
const { createAndSaveNotification } = require("../utils/notificationHelper");
// cDDrSRKNStK9EbTdxOrrjg:APA91bGM2YS4-dEx8H0FoVJJy1chzGZ23nlZuO3GXNjp0TslO5EK0XPNru_CusSYw5jTmWPoHVf1BQ6S96Z1Azg9w6eKJ2UMqT4b5Vy3JlIs5F-DMdyZh2_ja3LMweSnszCPXHDgm8C0
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
  console.log(currentTime);
  const reminders = await MedicationReminderModel.find({
    daysOfWeek: dayOfWeek,
    times: currentTime,
    endDate: { $gte: now },
  }).populate("user");
  reminders.forEach(async (reminder) => {
    console.log(reminder);
    const patientMessage = `Time to take your medication: ${reminder.medicationName}`;
    const caregiverMessage = `Reminder for your patient to take medication: ${reminder.medicationName}`;
    if (reminder.user.userType === 1) {
      const user = await dbService.findOne(User, {
        patientCode: reminder.user.patientCode,
      });
      const userDeviceToken = user.deviceToken;
      const userId = user._id;
      const caregiverId = user.careGiver_ID?._id;
      const caregiverDeviceToken = user.careGiver_ID?.deviceToken;
      const title = "Medication Reminder";
      if (userDeviceToken && userId) {
        await createAndSaveNotification(userId, patientMessage);
        await sendNotification(userDeviceToken, title, patientMessage);
      }
      if (caregiverDeviceToken && caregiverId) {
        await createAndSaveNotification(caregiverId, caregiverMessage);
        await sendNotification(caregiverDeviceToken, title, caregiverMessage);
      }
    }
  });
}

module.exports = { findAndNotifyReminders };
