const router = require('express').Router();
const { eventController } = require('../controller/index');
const Auth = require('../middleware/auth');

router.post('/event', eventController.createEvent);
router.get('/deletedata', eventController.deleteData);
router.patch('/updateevent', eventController.updateEvent);

module.exports = router;