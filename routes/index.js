const express = require('express');
const healthCheckRoutes = require('./healthcheckRoutes');
const manageUserRoutes = require('./manageUserRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const testRoutes = require('./testRoutes');
const courseRoutes = require('./courseRoutes');

const router = express.Router();

router.use(healthCheckRoutes);
router.use(authRoutes);
router.use(testRoutes);
router.use(courseRoutes);
router.use(manageUserRoutes);

module.exports = router;