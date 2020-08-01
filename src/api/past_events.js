var express = require('express');
var router = express.Router();
var utility = require('./utility_functions.js')
var events = require('./mongo_connect.js')
var past_events = events.past_events;
var itemsPerPage = 10;



router.get("/", function(req, res){
    
    if(req.query.pageNum){
        var pageNum = req.query.pageNum;
        past_events.find({},{'_id':0, '__v':0}).skip(pageNum>0?( (pageNum-1)*itemsPerPage):0).limit(itemsPerPage).exec(function(err, response){
            if(err) throw err;
            res.status(200);
            res.json(response);
        })
    }
    else{
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
    }
});

router.put("/", function(req, res){
    if(!req.body.slug || (!req.body.youtube && !req.body.blog)){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        var url = req.body.links;
        var key = req.body.slug;

        update_links = {"blog": req.body.blog || '',
                        "youtube": req.body.youtube||''}
 
        past_events.findOneAndUpdate({"slug":key},{$set:update_links},{new: true}).exec(function(err,response){
                if(err)
                    res.json({message: "Query error", type:err});
                else{
                    res.status(201);
                    res.json({Status:"Success",Details: response});
                }
            });
        }
});

module.exports = router;
