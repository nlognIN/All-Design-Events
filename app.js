var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const hostname = process.env.HOST;
const port = process.env.PORT;
var schedule = require('node-schedule');
var cors = require('cors');
var post_api = require('./src/api/active_events.js');
var migration_api = require('./src/api/migrate_post.js');
var past_events_api = require('./src/api/past_events.js')
var users_api = require('./src/api/users_database.js')
var eventreg_api = require('./src/api/event_subscription.js')
var export_csv = require('./src/api/export_csv');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//var j = schedule.scheduleJob('10 9 22 * * *', function(){
var j = schedule.scheduleJob('01 17 20 * * *', function(){
	migration_api.migrate()
});


app.use('/api/events/', post_api);
app.use('/api/past_events', past_events_api);
app.use('/api/users', users_api);
app.use('/api/event_subscription', eventreg_api);
app.use('/api/export_csv', export_csv);

app.get("/", function(req, res){
	res.status(200);
	res.json("hello world");
	console.log('hello');
});

app.listen(port, function(){
	console.log("|=====================================|");
	console.log("|===| Server Started Successfully |===|")
	console.log(`|===|   http://${hostname}:${port}/    |===|`);
	console.log("|=====================================|");

});
