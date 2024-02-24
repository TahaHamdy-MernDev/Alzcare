
const router = require('express').Router();
const mealAlarmController = require('../controllers/mealAlarmController');
const idValidator = require('../utils/idValidator');

router.get('/user/:id/mealAlarm', mealAlarmController.getAllUserMealAlarm)

router.post('/', mealAlarmController.createMealAlarm);
router.get('/:id', idValidator, mealAlarmController.getMealAlarmById);
router.put('/:id', idValidator, mealAlarmController.updateMealAlarm)
router.delete('/:id', idValidator, mealAlarmController.deleteMealAlarm)
module.exports = router;
