var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
const hostname = process.env.HOST;
const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var data = require('./src/api/post_api.js');

app.use('/api/events/v1',data);

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});
