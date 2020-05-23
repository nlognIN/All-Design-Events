var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/design_events', { useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true });

var eventschema = mongoose.Schema({    
    user_id: String,
    event_title: String,
    slug: String,
    created_on: Date,
    location: String,
    registration_link: String,
    event_date: Date,
    event_time: String,
    price: String,
    mode: String,
    organizer: String,
    image: String,
    description: String,
    clicks: Number
});
var events = mongoose.model("active_events", eventschema);

router.get("/", function(req, res){
    events.find({},{'_id':0, '__v':0}).exec(function(err, response){
        if(err) throw err;
        res.status(200);
        res.json(response);
    })
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
        console.log(type+" "+value);
        events.find({[type]:value},{'_id':0,'__v':0},function(err, response){
            if(err)
                res.json({message: "Bad Request", value:req.params.type});
            else{
                res.status(200);
                res.json(response);
            }
        });
    }
});


router.post("/", function(req, res){
    if(!req.body.user_id || !req.body.event_title || !req.body.location || !req.body.registration_link ||
     !req.body.event_date || !req.body.price || !req.body.mode || !req.body.organizer ){
        res.status(400);
        res.json({message: "Bad Request",Details: {movieId:id, Name:req.body.name, Year: req.body.year, rating: req.body.rating}});
    }
    else{
        var newEvent = new events({
            user_id: req.body.user_id,
            event_title: req.body.event_title,
            slug: req.body.title,
            created_on:  new Date(year, month, day),
            location: req.body.location,
            registration_link: req.body.registration_link,
            event_date: req.body.event_date,
            event_time: String,
            price: req.body.price,
            mode: req.body.mode,
            organizer: req.body.organizer,
            image: req.body.image || "",
            description: req.body.description || "",
            clicks: Number || 0
          });
          //newMovie.save(function(err, mov){
            // if(err)
              // res.json({message: "Database error", type: "error"});
           //  else{
            //    res.status(201);
                //res.json({Status:"Success",Details: {movieId:id, Name:req.body.name, Year: req.body.year, rating: req.body.rating}});
            //}
         // });
    }
});

/*
router.put("/", function(req, res){
    if(!req.body.movieId){
        res.status(400);
        res.json({message: "Bad Request",Details: {movieId:id, Name:req.body.name, Year: req.body.year, rating: req.body.rating}});
    }
    else{
        var movieId = req.body.movieId;
        var newMovie ={
            name: req.body.name||"N/A",
            year: req.body.year||0,
            rating: req.body.rating||0
        };
          //delete newMovie._id;
         // console.log(newMovie);
      events.findOneAndUpdate({"movieId":movieId},{$set:newMovie},{new: true}).exec(function(err,response){
             if(err)
                res.json({message: "Query error", type:err});
             else{
                res.status(201);
                res.json({Status:"Success",Details: response});
            }
        });
          id=id+1;
    }
});

router.delete("/:type/:value", function(req, res){
    if(req.params.type!="name"&&req.params.type!="year"&&req.params.type!="movieId"){
        res.status(400);
        res.json({message: "Bad Request", value:req.params.type});
    }
    else{
        var type = req.params.type;
        var value = req.params.value;
        events.deleteOne({[type]:value},function(err, mov){
            if(err){
                 res.json({message: "Database error", type: "error"});
            }
            else{
                res.status(200);
                res.json({Status:"Success",Removed: {[type]:value}});
            }
        });
    }
});
*/
module.exports = router;
