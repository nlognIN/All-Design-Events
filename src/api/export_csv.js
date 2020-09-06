var express = require('express');
var router = express.Router();
var fs = require('fs');
const middleware = require('./middleware/verify_user.js')
const {Parser} = require('json2csv');
var events = require('./mongo_connect.js')
var events_reg = events.events_registrations;

router.get("/:type/:value", middleware.verify, function(req, res){
    if(req.params.type != 'slug'){
       res.status(400);
        res.json({Message:"Error in creating CSV"})
    }
    else{
        var type = "event_id";
        var value = req.params.value;
        
        events_reg.find({[type]:value},{'_id':0,'reg_users._id':0,'__v':0},function(err, response){
            if(err)
                    res.json({message: "Bad Request", value:req.params.type});
            else{
                    if(!response.length)
                        res.redirect("https://alldesignevents.in");
                    else{
                        var data = (response[0]['reg_users'])
                
                        let fields =  ['user_email', 'user_name', 'user_phone'];
                        const parser = new Parser({
                            fields,
                            unwind: ['user_email', 'user_name', 'user_phone']
                        });
                        const csv = parser.parse(data);
                        var path = './public/csv/file'+new Date()+'.csv';
                        fs.writeFile(path, csv, function(err) {
                            if (err) throw err;
                            res.status(200);
                            res.download(path)
                            setTimeout(function () {
                                fs.unlinkSync(path); // delete this file after 30 seconds
                            }, 15000)
                        });
                    }
            }
        });
    }
});

module.exports = router;