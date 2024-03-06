const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const idValidator = require('../utils/idValidator');
const { authenticate } = require('../middlewares/auth');
const { validateRequestParameters } = require('../utils/validate');
const { prescriptionKeys } = require('../utils/validation/prescriptionValidation');
const { upload } = require('../utils/upload');

router.get('/get-all/:id', idValidator, prescriptionController.getAllPrescriptions);
router.post('/', authenticate, upload.fields([{ name: "prescriptionImage", maxCount: 1 }]), validateRequestParameters(prescriptionKeys), prescriptionController.createPrescription);

router.route('/:id', idValidator)
    .get(prescriptionController.getPrescriptionById)
    .put(upload.fields([{ name: "prescriptionImage", maxCount: 1 }]),validateRequestParameters(prescriptionKeys), prescriptionController.updatePrescription)
    .delete(prescriptionController.deletePrescription)
module.exports = router;