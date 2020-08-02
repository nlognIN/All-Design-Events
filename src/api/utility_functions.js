var crypto = require('crypto');
var events = require('./mongo_connect.js')
var events_reg = events.events_registrations;
var past_events = events.past_events;
module.exports = {

	generate_slug:function(str){

		str = str.replace(/^\s+|\s+$/g, ''); // trim the white spaces at the begning
	  	str = str.toLowerCase();

	  // remove accents, swap ñ for n, etc
	  	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
	  	var to   = "aaaaaeeeeeiiiiooooouuuunc------";
	  	
	  	for (var i=0, l=from.length ; i<l ; i++) {
	    	str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	  	}

	  	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	    	.replace(/\s+/g, '-') // collapse whitespace and replace by -
	    	.replace(/-+/g, '-'); // collapse dashes

		var hash = crypto.createHash('md5').update(str).digest('hex')
		var rand_pad = Math.floor(Math.random() * (999)) + 10
	 	return str +'-'+ hash.slice(0,4)+rand_pad.toString();
	},



	current_date:function(){
		var today = new Date();

		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		
		if(dd<10) 
    		dd='0'+dd;
	

		if(mm<10) 
    		mm='0'+mm;
	 
		today = dd+'/'+mm+'/'+yyyy;

		return today;
	},

	registration_count:function(slug){
		
		var reg_count = 0;
		var type = "event_id";
        events_reg.find({[type]:slug},{'_id':0,'__v':0},function(err, response){
            if(err){
				console.log("can't create the registration count")
			}
            else{
				reg_count = response[0]['reg_users'].length;
                past_events.findOneAndUpdate({"slug":slug},{$set:{"clicks":reg_count}},{new: true}).exec(function(err,response){
					if(err)
						console.log("registration count updation failed");
				});
            }
        });
	}
}
