var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
    password: {
       type: String,
        required: true 
    },

  userType: {
      type: Number,
      default: 1
  },
  status: {
      type:Number,
      default: 1
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = User;