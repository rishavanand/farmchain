'use strict';

// Load config
var config = require('./config/config.json');
//var environment = process.env.NODE_ENV || 'development';
global.gConfig = config;

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
app.use(bodyParser.urlencoded());
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

app.set('port', process.env.NODE_PORT || 8000);

// Get database access token
// database.fetchToken()
// 	.then(() => {
// 		var server = app.listen(app.get('port'), function () {
// 			debug('Express server listening on port ' + server.address().port);
// 			console.log('API server started')
// 		});
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})

app.listen(app.get('port'), function () {
	debug('Express server listening on port ' + app.get('port'));
	console.log('API server started')
});