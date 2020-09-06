var express = require('express');
var router = express.Router();
var utility = require('./utility_functions.js')
var events = require('./mongo_connect.js')
var events_reg = events.events_registrations;


router.get("/:type/:value", function(req, res){
    if(req.params.type != 'slug' ){
       res.status(400);
        res.json({Message:"Invalid parameters"})
    }
    else{
        var type = "event_id";
        var value = req.params.value;
        
        events_reg.find({[type]:value},{'_id':0,'__v':0},function(err, response){
            if(err)
                    res.json({message: "Bad Request", value:req.params.type});
            else{
                res.status(200);
                res.json(response);
            }
        });
    }
});

router.post("/", function(req,res){
    if(!req.body.slug || !req.body.email || !req.body.name){
        res.status(400);
        res.json({Message:"Invalid parameters"})
    }
    else{
        var type = "event_id";
        var value = req.body.slug;
        var reg_user = {
            user_email: req.body.email,
            user_name: req.body.name,
            user_phone: req.body.phone||''
        };
        
        newReg = new events_reg({
            event_id: value,
            reg_users: reg_user
        });

        events_reg.find({[type]:value},{'_id':0,'__v':0},function(err, response){
            if(err){
                res.status(500);
                res.response({Message:"Database Error"});
            }
            else{
                if(!response.length){
                    newReg.save(function(err, insert_result){
                        if(err)
                            res.json({message: "Can't register user to event", type: err});
                        else{
                            res.status(201);
                            res.json({ Message: "User Successfully Subscribed",insert_result});
                        }
                    });
                }
                else{
                    events_reg.findOneAndUpdate({"event_id":value},{$push:{"reg_users":reg_user}},{new: true}).exec(function(err,response){
                        if(err)
                           res.json({message: "Query error", type:err});
                        else{
                           res.status(201);
                           res.json({Status:"User Successfully Subscribed",Details: response});
                       }
                   });
                }
            }
        });
    }

});

module.exports = router;