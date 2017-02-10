var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoterAssignmentSchema = new Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Survey'
  },
voter: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Voter'
  },
author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  response: [],
  status: {
      type:Number,
      default: 1
  }
});


var VoterAssignment = mongoose.model('VoterAssignment', VoterAssignmentSchema);

module.exports = VoterAssignment;


    