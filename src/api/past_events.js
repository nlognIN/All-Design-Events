var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var utility = require('./utility_functions.js')
var events = require('./mongo_connect.js')
var active_events = events.active_events;
var past_events = events.past_events;



router.get("/", function(req, res){
    

	past_events.find({},{'_id':0,'__v':0},function(err, response){
        if(err){
       		res.status(400);
            res.json({message: "Bad Request"});
       	}
        else{
            res.status(200);
            res.json(response);
        }
	});	
});
 

module.exports = router;
