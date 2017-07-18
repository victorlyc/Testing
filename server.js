var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');

var router = require('./routes/route');

mongoose.connect(config.DB_URL, config.DB_OPTIONS);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
	console.log("MongoLab connected.");
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	'extended' : 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
	type : 'application/vnd.api+json'
}));
app.use(methodOverride());

app.get('/', router);

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(config.APP_PORT);
console.log("App listening on port 8080");