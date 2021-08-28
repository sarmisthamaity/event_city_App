const { getdataController } = require('../controller/index');
const router = require('express').Router();

router.get('/', getdataController.allUsers);
router.get('/mail', getdataController.dataById);

module.exports = router;