const router = require('express').Router();
const userRoute = require('./user.route');
const eventRoute = require('./event.routes');
const dataRoute = require('./get.route');
const eventGetRout = require('./getevent.route');

router.use('/', userRoute);
router.use('/', eventRoute);
router.use('/', dataRoute);
router.use('/', eventGetRout);

module.exports = router;