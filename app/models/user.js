var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  password: String,
  timestamp: { type: Date, default: Date.now }
});

var User = mongoose.model('Users', usersSchema);

User.comparePassword = function(inputPass, savedPass, cb) {
  bcrpyt.compare(inputPass, savedPass, function(err, match) {
    if (err) {
      return cb(err);
    }
    cb(null, match);
  });
};

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});



















/*
var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});
*/
module.exports = User;
