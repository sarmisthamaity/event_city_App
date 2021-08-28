const router = require('express').Router();
const signUpRoute = require('./signup.route');
const loginRoute = require('./login.route');
const eventRoute = require('./event.routes');
const dataRoute = require('./get.route');

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);
router.use('/event', eventRoute);
router.use('/dataget', dataRoute);

module.exports = router;