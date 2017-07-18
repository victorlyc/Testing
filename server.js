var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var router = require('./routes/route');

var options = {
	server : {
		socketOptions : {
			keepAlive : 300000,
			connectTimeoutMS : 30000
		}
	},
	replset : {
		socketOptions : {
			keepAlive : 300000,
			connectTimeoutMS : 30000
		}
	}
};

var mongodbUri = 'mongodb://admin:123@ds019668.mlab.com:19668/mongo_test';

mongoose.connect(mongodbUri, options);
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

app.listen(8080);
console.log("App listening on port 8080");