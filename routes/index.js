const express = require('express');
const healthCheckRoutes = require('./healthcheckRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const testRoutes = require('./testRoutes');
const courseRoutes = require('./courseRoutes');

const router = express.Router();

router.use(healthCheckRoutes);
router.use(userRoutes);
router.use(authRoutes);
router.use(testRoutes);
router.use(courseRoutes);

module.exports = router;