const { getEventController } = require('../controller/index');

const router = require('express').Router();

router.get('/sortEvent', getEventController.sortByName);

module.exports = router;