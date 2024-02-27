const express = require('express');
const router = express.Router();

/******** CONTROLLERS ********/
const NotificationController = require('./controllers/NotificationController');

/******** ROUTES ********/
router.post('/api/notify', NotificationController.notify);
router.get('/api/notifications/', NotificationController.notifications);
router.post('/api/notifications/:id/mark-as-read', NotificationController.mark_as_read);

module.exports = router;