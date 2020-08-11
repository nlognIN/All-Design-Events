var express = require('express');
var router = express.Router();
var utility = require('./utility_functions.js')
var events = require('./mongo_connect.js')
var active_events = events.active_events;
var past_events = events.past_events;
var itemsPerPage = 10;

router.get("/", function(req, res){
    if(req.query.pageNum){
        var pageNum = req.query.pageNum;
        active_events.find({},{'_id':0, '__v':0}).skip(pageNum>0?( (pageNum-1)*itemsPerPage):0).limit(itemsPerPage).exec(function(err, response){
            if(err) throw err;
            res.status(200);
            res.json(response);
        })
    }
    else{
        active_events.find({},{'_id':0, '__v':0}).exec(function(err, response){
            if(err) throw err;
            res.status(200);
            res.json(response);
        })
    }
});

router.get("/:type/:value", function(req, res){
    if(req.params.type!="slug"&&req.params.type!="mode"&&req.params.type!="price"&&req.params.type!="location"
        &&req.params.type!="user_id"){
        res.status(400);
        res.json({message: "Bad Request", value:req.params.type});
    }
    else{
        var type = req.params.type;
        var value = req.params.value;
        
        if(req.query.pageNum){
            var pageNum = req.query.pageNum;
            active_events.find({[type]:value},{'_id':0, '__v':0}).skip(pageNum>0?( (pageNum-1)*itemsPerPage):0).limit(itemsPerPage).exec(function(err, response){
                if(err) throw err;
                res.status(200);
                res.json(response);
            })
        }

        else{
            active_events.find({[type]:value},{'_id':0,'__v':0},function(err, response){
                if(err){
                    console.log("in error")
                }
                else{
                    if(!response.length)
                    {
                        console.log("here")
                        past_events.find({[type]:value},{'_id':0,'__v':0},function(err, past_res){
                            if(err){
                                res.status(404);
                                res.json({message: "Not found"});
                            }
                            else{
                                res.status(200);
                                res.json(past_res);
                            }
                        });
                    }
                    else{
                        res.status(200);
                        res.json(response);
                    }
                }
            });
        }
    }
});


router.post("/", function(req, res){
	//console.log("auth_key="+req.header("auth_key"));
    if(!req.body.user_id || !req.body.event_title || !req.body.location ||
     !req.body.event_date || !req.body.price || !req.body.mode || !req.body.organizer){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        var reg_link;
        var temp_slug = utility.generate_slug(req.body.event_title);
        
        if(req.body.registration_link)
            reg_link = req.body.registration_link;
        else
            reg_link = "https://alldesignevents.in/"+temp_slug;

        var newEvent = new active_events({
            user_id: req.body.user_id,
            event_title: req.body.event_title,
            slug: temp_slug,
            created_on: utility.current_date(),
            location: req.body.location,
            registration_link: reg_link,
            event_date: req.body.event_date,
            event_time: req.body.event_time || '',
            event_time_zone: req.body.event_time_zone || '',
            price: req.body.price,
            mode: req.body.mode,
            organizer: req.body.organizer,
            image: req.body.image || "",
            description: req.body.description || "",
            isactive: "true"
          });
          newEvent.save(function(err, insrt_result){
             if(err)
               res.json({message: "Database error", type: err});
             else{
                res.status(201);
                res.json({insrt_result});
            }
         });
    }   
});

router.put("/", function(req, res){
	//console.log("auth_key="+req.header("auth_key"));
    if(!req.body.slug){

        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        var event_id = req.body.slug;

          active_events.find({["slug"]:event_id}, function(err, response){
             if(err)
               res.json({message: "Database error", type: err});
             else{
                if(!response.length){
                    res.status(404);
                    res.json({Message:"Event not Found"});
                }
                else{
                    var update_values = {
                        event_title: req.body.event_title || response[0]['event_title'],
                        location: req.body.location || response[0]['location'],
                        event_date: req.body.event_date || response[0]['event_date'],
                        event_time: req.body.event_time || response[0]['event_time'],
                        price: req.body.price || response[0]['price'],
                        mode: req.body.mode || response[0]['mode'],
                        organizer: req.body.organizer || response[0]['organizer'],
                        image: req.body.image || response[0]['image'],
                        description: req.body.description || response[0]['description']
                      };

                      active_events.findOneAndUpdate({"slug":event_id},{$set:update_values},{new: true}).exec(function(err,updated_value){
                        if(err){
                            res.status(500);
                            res.json({message: "Internal Server Error", type:err});
                        }
                        else{
                            res.status(200);
                            res.json({Status:"Success",Details: updated_value});
                        }
                      });
                }   
            }
         });
    }   
});

module.exports = router;
