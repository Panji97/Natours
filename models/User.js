const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    require: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE & SAVE!
      validator: function(el) {
        return el === this.password;
      }
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;