var utility = require('./utility_functions.js')
var events = require('./mongo_connect.js')
var active_events = events.active_events;
var past_events = events.past_events;

module.exports = {

	migrate:function(){
		var type = "event_date";
		var value = utility.current_date(); 

		active_events.find({[type]:value},{'_id':0,'__v':0},function(err, response){
	        if(err){
	          	console.log("error in getting post for migration");
	        }
	        else{

	            for(var i=0; i<response.length; i++){
					
					var slug =  response[i].slug;
			        var newEvent = new past_events({
			            user_id: response[i].user_id,
			            event_title: response[i].event_title,
			            slug: response[i].slug,
			            created_on: response[i].created_on,
			            location: response[i].location,
			            registration_link: response[i].registration_link,
			            event_date: response[i].event_date,
						event_time: response[i].event_time || '',
						event_time_zone: response[i].event_time_zone || '', 
			            price: response[i].price,
			            mode: response[i].mode,
			            organizer: response[i].organizer,
			            image: response[i].image || "",
						description: response[i].description || "",
						clicks: 0,
						youtube: "",
    					blog: "",
						other: "",
						isactive: "false"
			        });

			        newEvent.save(function(err, temp_response){
			            if(err){
			               	console.log("error in migrating post");
						}
						else{
							utility.registration_count(slug);
						}
			            
			    	});	
		        }
		        active_events.deleteMany({[type]:value},function(err, mov){
					if(err){
					    res.json({message: "Error in deleting the migrated post", type: "error"});
					}
					else{
			                console.log("migration successfull")
		            }
		        });
		    }
    	});

	}
}


