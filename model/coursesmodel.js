const mongoose = require('mongoose');

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    allowNull: false,
  },
  className: {
    type: String,
    allowNull: false,
  },
  coursePrice: {
    type: String,
    allowNull: false,
  },
  courseDuration: {
    type: String,
    allowNull: false,
  },
  courseMode: {
    type: String,
    allowNull: false,
  },
  courseDetails: {
    type: String,
    allowNull: false,
  },
  courseImages: {
    type: String,
    allowNull: false,
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});
  
module.exports = mongoose.model('courses', Course, "courses");