'use strict';

// Load config
var environment = process.env.NODE_ENV || 'local';
console.log(`Starting in ${environment}!`)
if (environment == 'local') {
	global.gConfig = require('./config/config.json');
} else {
	global.gConfig = {
		"jwtSecret": process.env.JWT_SECRET,
		"twilioMobileNumber": process.env.TWILIO_MOBILE_NUMBER,
		"twilioSid": process.env.TWILIO_SID,
		"twilioAuthToken": process.env.TWILIO_AUTH_TOKEN,
		"mongoUrl": process.env.MONGO_URL,
		"nodePort": process.env.NODE_PORT
	};
}

// Requires
var debug = require('debug')('farmchain');
var express = require('express');
//var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lib = require('./lib');
var database = lib.database;

var routes = require('./routes/index');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use(function (err, req, res, next) {
	console.log(err);
	res.status(err.status || 500);
	return res.json({
		success: false,
		error: err.message
	});
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', reason.stack || reason)
	// Recommended: send the information to sentry.io
	// or whatever crash reporting service you use
})

app.set('port', global.gConfig.nodePort || 8000);

app.listen(app.get('port'), function () {
	debug('Express server listening on port ' + app.get('port'));
	console.log('API server started on port ' + app.get('port'))
});