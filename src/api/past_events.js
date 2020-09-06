var express = require('express');
var router = express.Router();
var utility = require('./utility_functions')
var events = require('./mongo_connect.js')
const middleware = require('./middleware/verify_user')
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

router.put("/", middleware.verify, function(req, res){
    if(!req.body.user_id || !req.body.slug || (!req.body.youtube && !req.body.blog)){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else
    {
        if(req.gv_user_email == req.body.user_id || middleware.isadmin(req.gv_user_email))
        {
            var key = req.body.slug;
            update_links = {"blog": req.body.blog || '',
                            "youtube": req.body.youtube||''}
    
            past_events.findOneAndUpdate({"slug":key, "user_id": req.body.user_id },{$set:update_links},{new: true}).exec(function(err,response){
                    if(err)
                        res.json({message: "Query error", type:err});
                    else{
                        res.status(201);
                        res.json({Status:"Success",Details: response});
                    }
            });
        }
        else{
            res.status(400);    
            res.json({message: "Bad Request: Auth Failed"});
        }
    }
});

module.exports = router;
