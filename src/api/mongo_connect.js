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

const active_events = mongoose.model("active_events", eventschema);
const past_events = mongoose.model("past_events", eventschema); 

module.exports = {active_events, past_events};