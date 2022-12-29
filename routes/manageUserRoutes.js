const router = require('express').Router();
const manageUserController = require('../controllers/manageUserController');
const { validateOpenRequest } = require('../auth/request-validation');
const { authoriseAdminRoutes } = require('../auth/authorise_admin_routes');
const { checkToken } = require('../auth/Token_validation');

router.get('/fetchusers', validateOpenRequest, authoriseAdminRoutes, manageUserController.fetchUser);


module.exports = router;

