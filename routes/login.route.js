const router = require('express').Router();
const { loginController } = require('../controller/index');

router.post('/', loginController.login);

module.exports = router;