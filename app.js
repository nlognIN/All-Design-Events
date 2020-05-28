var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const hostname = process.env.HOST;
const port = process.env.PORT;
var schedule = require('node-schedule');
var cors = require('cors');
var utility = require('./src/api/utility_functions.js')
var post_api = require('./src/api/post_api.js');
var migration_api = require('./src/api/migrate_post.js');
var past_events_api = require('./src/api/past_events.js')


var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var j = schedule.scheduleJob('59 * * * * *', function(){
	migration_api.migrate()
});


app.use('/api/events/v1',post_api);
app.use('/api/past_events',past_events_api);

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});
