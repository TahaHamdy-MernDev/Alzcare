const router = require("express").Router();
router.use(require("./passwordRoute"));
router.use("/auth", require("./authRoute"));
router.use("/diary", require("./diaryRoute"));
router.use("/community", require("./communityRoute"));
router.use("/meal-alarm", require("./mealAlarmRoutes"));
router.use("/prescriptions", require("./prescriptionRoute"));
router.use("/tests", require("./testRoute"));
router.use("/medical-details", require("./medicalDetailsRoute"));
router.use("/medication-reminder", require("./medicationReminderRoute"));
router.use("/profile", require("./profileRoute"));
router.use("/chat", require("./chatRoute"));

module.exports = router;
