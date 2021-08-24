const router = require('express').Router();
const signUpRoute = require('./signup.route');
const loginRoute = require('./login.route');
const eventRoute = require('./event.routes');

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);
router.use('/event', eventRoute);

module.exports = router;