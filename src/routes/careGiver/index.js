const router = require("express").Router();
const { CareGiver } = require("../../middlewares/auth");
router.use(CareGiver)
router.use("/medical-details", require("./patientMedicalDetailsRoute"));
router.use("/medication-reminder", require("./patientMedicationReminderRoute"));
router.use("/prescription", require("./patientPrescriptionRoute"));
router.use("/test", require("./patientTestRoute"));
module.exports = router;
