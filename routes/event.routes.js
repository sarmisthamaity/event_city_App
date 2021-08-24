const router = require('express').Router();
const { eventController } = require('../controller/index');
const Auth = require('../middleware/auth');

router.post('/', Auth, eventController.createEvent);

module.exports = router;