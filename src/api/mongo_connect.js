var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/design_events', { useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true });

var eventschema = mongoose.Schema({    
    user_id: String,
    event_title: String,
    slug: String,
    created_on: String,
    location: String,
    registration_link: String,
    event_date: String,
    event_time: String,
    price: String,
    mode: String,
    organizer: String,
    image: String,
    description: String,
    clicks: Number
});

var past_eventschema = mongoose.Schema({    
    user_id: String,
    event_title: String,
    slug: String,
    created_on: String,
    location: String,
    registration_link: String,
    event_date: String,
    event_time: String,
    price: String,
    mode: String,
    organizer: String,
    image: String,
    description: String,
    clicks: Number,
    links: String
});

var userschema = mongoose.Schema({    
    user_id: String,
    user_name: String,
    user_fullname: String,
    created_on: String,
    user_image: String,
    user_bio: String,
    isadmin: Number
});

const active_events = mongoose.model("active_events", eventschema);
const past_events = mongoose.model("past_events", past_eventschema); 
const users_db = mongoose.model("user_db", userschema); 

module.exports = {active_events, past_events,users_db};