const router = require('express').Router();
const logController = require('../controllers/logMonitorController');
const { validateOpenRequest } = require('../auth/request-validation');
const { checkToken } = require('../auth/Token_validation');


router.get('/getalllogs', validateOpenRequest, checkToken, logController.getAllLogs);


module.exports = router