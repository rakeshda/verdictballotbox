var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  surveyName: {
    type: String,
    required: true
  },
author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  startDate: {
    type : Date, 
      default: Date.now
    
  },
endDate: {
    type : Date, 
    default: Date.now
   
  },
  templateType: {
      type: String,
      default: 1
  },
questions: [{
    stem: {String},
    options: [{stem:{String}}],
    optionType:{
       type:Number,
      default: 1 
    }
    
}],
  status: {
      type:Number,
      default: 1
  }
});


var Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;


       