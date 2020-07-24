var express = require('express');
var router = express.Router();
var utility = require('./utility_functions.js')
var users = require('./mongo_connect.js')
var user_db = users.users_db;

router.get("/", function(req, res){

      user_db.find({},{'_id':0, '__v':0}).exec(function(err, response){
        if(err) throw err;
        res.status(200);
        res.json(response);
       })
    
});

router.get("/:type/:value", function(req, res){
    if(req.params.type!="user_id"){
        res.status(400);
        res.json({message: "Bad Request", value:req.params.type});
    }
    else{
        var type = req.params.type;
        var value = req.params.value;
        
        user_db.find({[type]:value},{'_id':0,'__v':0},function(err, response){
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
	console.log("auth_key="+req.header("auth_key"));
    if(!req.body.user_id || !req.body.user_fullname){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        user_name_recieved = req.body.user_id;

        var newUser = new user_db({
            user_id: req.body.user_id,
            user_name: req.body.user_name || '',
            user_fullname: req.body.user_fullname,          
            created_on: utility.current_date(),
            user_image: req.body.image_url || '',
            user_bio: req.body.bio|| '',
            isadmin:req.body.isadmin||0,
            orgnization: req.body.orgnization||''
          });

        user_db.find({["user_id"]:user_name_recieved},{'_id':0,'__v':0},function(err, response){
            if(err){
                res.status(500);
                res.response({Message:"Database Error"});
            }
            else{
                if(!response.length){
                    newUser.save(function(err, insert_result){
                        if(err)
                            res.json({message: "Database error", type: err});
                        else{
                            res.status(201);
                            res.json({ Message: "User Registered Succeaadully",insert_result});
                        }
                    });
                }
                else{
                    res.status(200);
                    res.json({Message:"User already exists"});
                }
            }
        });
    }   
});



module.exports = router;