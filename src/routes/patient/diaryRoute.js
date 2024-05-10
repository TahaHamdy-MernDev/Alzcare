const router = require('express').Router();

const { upload } = require('../../utils/upload');
const { authenticate } = require('../../middlewares/auth');
const diaryController = require('../../controllers/patient/diaryController');
const idValidator = require('../../utils/idValidator');
const { validateRequestParameters } = require('../../utils/validate');
const { createDiaryKeys } = require('../../utils/validation/diaryValidation');

router.get('/get-all', authenticate, diaryController.getAllDiaries);
router.get('/get-one/:id', idValidator, authenticate, diaryController.getDiaryById);
router.post('/create', authenticate, upload.fields([
    { name: "voiceNote", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), validateRequestParameters(createDiaryKeys), diaryController.createDiary);
router.put('/update-one/:id', upload.fields([
    { name: "voiceNote", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), idValidator, diaryController.updateDiary);
router.delete('/delete-one/:id', idValidator, diaryController.deleteDiary);

module.exports = router;
