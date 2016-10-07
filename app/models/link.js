var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: { type: Date, default: Date.now }
});
var Link = mongoose.model('Link', linkSchema);

var createShort = function(url){
  var shasum = cryto.createHash('sha1');
  shashum.update(url);
  return shashum.digest('hex').slice(0,5);
};
linkSchema.pre('save', function(next){
  var code = createShort(this.url);
  this.code = code;
  next();
})



/*
var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});
*/
module.exports = Link;
