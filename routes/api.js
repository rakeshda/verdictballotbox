//-- Developer: Rakesh Dayal;
var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var User = require('../models/User');
var Survey = require('../models/Survey');
var Voter = require('../models/Voter');
var VoterAssignment = require('../models/VoterAssignment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Not a valid request');
});
//===
var apiID ='@hey#r@ke$h#(%data%)dede' ;

//====
router.post('/register', function(req, res, next) {
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    User.findOne({email:req.body.email}, function(error, result){
       if(error){
           return next(error);
       } else if(result){
           return res.status(401).json({type:3, error: 'User already exist' });
       }else{
            var user = new User(req.body);
            user.save(function(err, data){
                if(err){ return next(err); }
                res.json({message: "User Added!"});
            }); 
       }
    });
    
});


router.post('/login', function(req, res, next) {
//	console.log(req.body.email, req.body.password);
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
	User.find({'email':req.body.email, 'password':req.body.password},function(err, data){
	    if(err){ return next(err); }
        
        if(data.length == 1){
            var usr = data[0];
//            delete usr.password;
            var usr= {
                _id: data[0]._id,
                name: data[0].name,
                email: data[0].email,
                userType: data[0].usertype
            }
//            console.log(usr);
            res.json(usr);
            
        }else{
           res.status(401).json({type:2, error: 'Invalid email/password' }); 
        }
		
	});
});
//==
router.post('/getAllUsers', function(req, res, next) {
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    User.find({},function(err, data){
	    if(err){ return next(err); }
//        console.log(data);
        res.json(data);
    }).select('email name status userType');
});

//====
router.post('/addSurvey', function(req, res, next) {
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
  var survey = new Survey(req.body);
	survey.save(function(err, data){
    if(err){ return next(err); }
		res.json({message: "Survey Added!"});
  });
});
//===

router.post('/getSurvey', function(req, res, next) {
//	console.log(req.body.apiID);
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    var query = {};
    if(req.body.author == "" || req.body.author == undefined || req.body.author == null) {
        query = {};
//        console.log("herere...1")
    }else{
        query = {'author':req.body.author};
//        console.log("herere...2")
    }
//    console.log(query);
	Survey.find(query,function(err, data){
	    if(err){ return next(err); }
//        console.log(data);
        res.json(data);
    }).populate('author', 'name');
});

//=====
router.post('/addVoter', function(req, res, next) {
    
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
  var voter = new Voter(req.body);
	voter.save(function(err, data){
    if(err){ return next(err); }
		res.json({message: "Voter Added!"});
  });
});
//=====
router.post('/addVoters', function(req, res, next) {
   if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    var dataToInsert = req.body
    console.log(dataToInsert.length);
    Voter.insertMany(dataToInsert, function(err, data){
        if(err){ return next(err); }
        res.json(data);
    });
});

function saveToMongo(obj){
//    console.log(obj);
//    var voter = new Voter(obj);
//	voter.save(function(err, data){
//        if(err){ return next(err); }
////        console.log("Added")
//		res.json({message: "Voter Added!"});
//    });
}

//====
router.post('/getVoterList', function(req, res, next) {
    if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
//	console.log(req.body.email, req.body.password);
    var query = {};
    if(req.body.author == "" || req.body.author == undefined || req.body.author == null) {
        query = {};
//        console.log("herere...1")
    }else{
        query = {'author':req.body.author};
//        console.log("herere...2")
    }
//    console.log(query);
	Voter.find(query,function(err, data){
	    if(err){ return next(err); }
//        console.log(data);
        res.json(data);
    }).select('email');
});
//====
router.post('/assignVoters', function(req, res, next) {
   if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
//    console.log("here....")
    var dataToInsert = req.body
//    console.log(dataToInsert);
    VoterAssignment.insertMany(dataToInsert, function(err, data){
        if(err){ return next(err); }
        res.json(data);
    });
});
//===
router.post('/getVoterBySurvey', function(req, res, next) {
  if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    VoterAssignment.find({"survey": req.body.survey},function(err, data){
	    if(err){ return next(err); }
//        console.log(data);
        res.json(data);
    });
});
//====


router.put('/vote/:id', function(req, res, next) {
  if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
    VoterAssignment.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
//      console.log(req.body)
    if (err) return next(err);
    res.json(data);
  });
});
//====  
router.post('/getSurveyResponse', function(req, res, next) {
   if(req.body.apiID != apiID){
       return res.status(401).json({type:1, error: 'Invalid API' }); 
    };
//    console.log(req.body.survey);
    VoterAssignment.find({"survey": req.body.survey},function(err, data){
	    if(err){ return next(err); }
//        console.log(data);
        res.json(data);
    }).select('response');
});
//====  
module.exports = router;
