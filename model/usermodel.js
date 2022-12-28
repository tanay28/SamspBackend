const mongoose = require('mongoose');

const User = new mongoose.Schema({
  fullName: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
  password: {
    type: String,
    allowNull: false,
  },
  phoneNo: {
    type: String,
    allowNull:false
  },
  className: {
    type: String,
    allowNull: true
  },
  schoolName: {
    type: String,
    allowNull: true
  },
  preparationFor: {
    type: String,
    allowNull: true
  },
  access: {
    type: Boolean,
    allowNull: false
  },
  role: {
    type: Number,
    allowNull: false
  }
});
  
module.exports = mongoose.model('users', User, "users");