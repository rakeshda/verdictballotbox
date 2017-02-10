var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: {
    type: String,
  },
  status: {
      type:Number,
      default: 1
  }
});


var Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;