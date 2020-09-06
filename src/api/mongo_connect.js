var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/design_events', { useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true });

/* Schema Start */

/* Active Events Schema */
var eventschema = mongoose.Schema({    
    user_id: String,
    event_title: String,
    slug: String,
    created_on: String,
    location: String,
    registration_link: String,
    event_date: String,
    event_time: String,
    event_time_zone:String,
    price: String,
    mode: String,
    organizer: String,
    image: String,
    description: String,
    isactive:String
});

/* Past Events Schema */
var past_eventschema = mongoose.Schema({    
    user_id: String,
    event_title: String,
    slug: String,
    created_on: String,
    location: String,
    registration_link: String,
    event_date: String,
    event_time: String,
    event_time_zone:String,
    price: String,
    mode: String,
    organizer: String,
    image: String,
    description: String,
    clicks: Number,
    youtube: String,
    blog: String,
    other: String,
    isactive:String
});

/* Registered Users Schema */
var userschema = mongoose.Schema({    
    user_id: String,
    user_name: String,
    user_fullname: String,
    created_on: String,
    user_image: String,
    user_bio: String,
    isadmin: Number,
    organization: String,
    organization_image:String
});

/* Event Registration Schema */
var users_eventregschema = mongoose.Schema({
    user_email: String,
    user_name: String,
    user_phone: String
});

var event_registrationschema = mongoose.Schema({
    event_id: String,
    reg_users: [users_eventregschema]
});

/* Schema End */

const active_events = mongoose.model("active_events", eventschema);
const past_events = mongoose.model("past_events", past_eventschema); 
const users_db = mongoose.model("user_db", userschema); 
const events_registrations = mongoose.model("event_registrations", event_registrationschema); 

module.exports = {active_events, past_events, users_db, events_registrations};