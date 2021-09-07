const { getdataController } = require('../controller/index');
const router = require('express').Router();
const Auth = require('../middleware/auth');

router.get('/allusersdata', Auth, getdataController.adminGetData);
router.get('/userwithEvent', Auth, getdataController.userWithEvents);
router.get('/allEvents', Auth, getdataController.eventGetByUser);

module.exports = router;