const logger = require('./LoggerController');
const { loggerStatus, OPERATIONS } = require('../config/LoggerObject');
const Course = require('../model/coursesmodel');
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
require('dotenv').config();
const { hash } = require("bcrypt");

module.exports = {

    createNewCourse: async (req, res) => {
        const { courseName, className, coursePrice, courseDuration, courseMode, courseDetails, courseImages, courseFeatures } = req.body;

        if (!courseName || !className || !coursePrice || !courseDuration || !courseMode || !courseDetails || !courseImages || !courseFeatures) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'courseName, className, coursePrice, courseDuration, courseMode, courseDetails, courseImages, courseFeatures are required!', null, OPERATIONS.COURSES.CREATE);
            res.status(400).json({ message: 'courseName, className, coursePrice, courseDuration, courseMode, courseDetails, courseImages, courseFeatures are required!' });
            return;
        }
        
        try {
            const newCourse = new Course({ 
                courseName : courseName,
                className: className,
                coursePrice : coursePrice,
                courseDuration : courseDuration,
                courseMode : courseMode,
                courseDetails : courseDetails,
                courseImages : courseImages,
                courseFeatures: courseFeatures,
                isDeleted: false 
            });

            const savedCourse = await newCourse.save().catch((err) => {
                logger.logActivity(loggerStatus.ERROR, req.body, 'Cannot create the course at the moment!', err, OPERATIONS.COURSES.CREATE);
                res.status(500).json({ error: 'Cannot create the course at the moment!' });
            });
        
            if (savedCourse) {
                logger.logActivity(loggerStatus.INFO, req.body, 'Course creation Successful!!', null, OPERATIONS.COURSES.CREATE);
                const courseDetails = {
                    id : savedCourse._id,
                    courseName : savedCourse.courseName
                }
                res.json({ 
                    message: 'Course Creation Successful!!',
                    data: courseDetails
                });
            }
        } catch (error) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Unable to execute db query to create', error, OPERATIONS.COURSES.CREATE);
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const condition = {isDeleted: false}
            const allExistingsCourse = await Course.find(condition).catch((err) => {
                logger.logActivity(loggerStatus.ERROR, req.body, 'Unable to fetch all course', err, OPERATIONS.COURSES.RETRIEVE);
            });

            if (allExistingsCourse.length > 0) {
                logger.logActivity(loggerStatus.INFO, req.body, 'All Courses are retrieved!!', null, OPERATIONS.COURSES.RETRIEVE);
                res.status(200).json({ 
                    message: 'All Courses are retrieved!!',
                    data: allExistingsCourse
                });
            }  else {
                logger.logActivity(loggerStatus.INFO, req.body, 'No Courses found!!', null, OPERATIONS.COURSES.RETRIEVE);
                res.status(400).json({ message: 'No Courses found!!' });
            }

        } catch (error) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Unable to execute db query to select', error, OPERATIONS.COURSES.RETRIEVE);
        }  
    },

    modifyCourse: async (req, res) => {

        const { data } = req.body;
        if (!data) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'data is required!', null, OPERATIONS.COURSES.MODIFY);
            res.status(400).json({ message: 'data is required' });
            return;
        }

        if(req.params.id == null) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Couese Id is missing.!!', null, OPERATIONS.COURSES.MODIFY);
            res.status(404).json({ message: 'Course Id is missing.!!'});
            return;  
        }

        const condition = { _id: req.params.id };
        const selectedCourse = await Course.findOne(condition).catch((err) => {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Unable to fetch course from DB', err, OPERATIONS.COURSES.MODIFY);
        });

        if (selectedCourse && selectedCourse != null) {
            const updateData = { $set: data };
            const options = { multi: false };

            const course = await Course.updateMany(condition, updateData).catch((err) => {
                logger.logActivity(loggerStatus.ERROR, updateData, 'Internal server error!!', err, OPERATIONS.COURSES.MODIFY);
                res.status(500).json({
                    status:500,
                    data: 'Internal server error..!! Please try after some time.'
                });
                return;
            });

            if(course != null) {
                logger.logActivity(loggerStatus.INFO, updateData, 'Course updated!!', null, OPERATIONS.COURSES.MODIFY);
                res.status(200).json({
                    status: 200,
                    message: 'All Courses are retrieved!!',
                    data: course
                });
            } else {
                res.status(500).json({
                    status: 500,
                    msg: 'Something went wrong!! Please try again after some time.'
                });
                return;
            }
        } else {
            logger.logActivity(loggerStatus.ERROR, req.params.id, 'Invalid course!!', null, OPERATIONS.COURSES.MODIFY);
            res.status(400).json({
                status:400,
                data: 'Invalid course!!'
            });
            return; 
        }
    },

    removeCourse: async (req, res) => {
        if(req.params.id == null) {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Couese Id is missing.!!', null, OPERATIONS.COURSES.REMOVE);
            res.status(404).json({ message: 'Course Id is missing.!!'});
            return;  
        }

        const condition = { _id: req.params.id };
        const selectedCourse = await Course.findOne(condition).catch((err) => {
            logger.logActivity(loggerStatus.ERROR, req.body, 'Unable to fetch course from DB', err, OPERATIONS.COURSES.REMOVE);
        });

        if (selectedCourse && selectedCourse != null) {
            const updateData = { $set: { isDeleted: true } };
            const options = { multi: false };

            const course = await Course.updateMany(condition, updateData).catch((err) => {
                logger.logActivity(loggerStatus.ERROR, updateData, 'Internal server error!!', err, OPERATIONS.COURSES.REMOVE);
                res.status(500).json({
                    status:500,
                    data: 'Internal server error..!! Please try after some time.'
                });
                return;
            });

            if(course != null) {
                logger.logActivity(loggerStatus.INFO, updateData, 'Course removed!!', null, OPERATIONS.COURSES.REMOVE);
                res.status(200).json({
                    status: 200,
                    user: updateData
                });
            } else {
                res.status(500).json({
                    status: 500,
                    msg: 'Something went wrong!! Please try again after some time.'
                });
                return;
            }
        } else {
            logger.logActivity(loggerStatus.ERROR, req.params.id, 'Invalid course!!', null, OPERATIONS.COURSES.REMOVE);
            res.status(400).json({
                status:400,
                data: 'Invalid course!!'
            });
            return; 
        }

    }
}

