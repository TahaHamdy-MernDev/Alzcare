const { getAllNotifications, deleteAllNotifications } = require('../controllers/notificationController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();


router.get('/get-all', authenticate, getAllNotifications);
router.delete('/delete-all', authenticate, deleteAllNotifications);

module.exports = router; 