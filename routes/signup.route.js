const { signUpController } = require('../controller/index');
const router = require('express').Router();

router.post('/', signUpController.signUp);

module.exports = router;