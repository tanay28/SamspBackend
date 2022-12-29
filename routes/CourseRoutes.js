const router = require('express').Router();
const courseController = require('../controllers/CourseController');
const { validateOpenRequest } = require('../auth/request-validation');
const { authoriseAdminRoutes } = require('../auth/authorise_admin_routes');
const { checkToken } = require('../auth/Token_validation');

router.post('/courses', validateOpenRequest, authoriseAdminRoutes, courseController.createNewCourse);
router.get('/courses', validateOpenRequest, authoriseAdminRoutes, courseController.getAllCourses);
router.put('/courses/:id', validateOpenRequest, authoriseAdminRoutes, courseController.modifyCourse);
router.delete('/courses/:id', validateOpenRequest, authoriseAdminRoutes, courseController.removeCourse);


module.exports = router;