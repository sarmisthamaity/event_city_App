const { userController } = require('../controller/index');
const router = require('express').Router();

router.post('/signup', userController.signUp);
router.post('/Login', userController.login);

module.exports = router;