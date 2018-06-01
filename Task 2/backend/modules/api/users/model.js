const mongoose = require('mongoose');
const Schema = mongoose.Schema;4
const bcrypt = require('bcryptjs');

const userModel = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: {type: String, required: true},
  email: {
    type: String, required: true, unique: true, validate: {
      validator: function (value) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      },
      message: "{VALUE} is not email address!"
    } // check email hop le (validate mongoose) 
  },
  password: { type: String, required: true },

  active: { type: Boolean, default: true }

  },
  {
    timestamps: { createdAt: "createdAt" }
  })

  userModel.pre('save', function (next) { //truoc khi mongoose save thi goi function nay
    if (!this.isModified('password')) {
      return next(); //truoc khi save, khong sua password thi next
    }
    bcrypt
      .genSalt(12) // them 12 chu dang sau, vi du 123456 -> 123456fsofjisfiowe -> hash(password)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => next(err))
  });// co this nen khong dung arrow function duoc
  
  module.exports = mongoose.model('users', userModel);
  