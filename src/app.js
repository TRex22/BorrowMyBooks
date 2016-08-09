/* jshint node: true */

/*
logger.
  warn
  error
  debug
*/

var logger = require("./logger/logger");
logger.info("mongoose setup...");
// mongoose setup
require( './config/db' );

logger.info("passport setup...");
var passport = require('passport');
require('./config/passport')(passport); 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
/*var logger = require('morgan');*/
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var pkg = require('./package.json');
var config = require('./config.json');

var routes = require('./routes/index');
var users = require('./routes/users');
var teapot = require('./routes/teapot');

var app = express();

logger.info("Overriding 'Express' logger");
app.use(require('morgan')("combined", { "stream": logger.stream }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info('Connected IP:', ip);
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/teapot', teapot);

//TODO: JMC Fix
app.get('/login', function(req, res) {
    res.render('login.ejs', { 'title': pkg.name, 'buildVersion': pkg.version });
});
app.post('/login', passport.authenticate('login', {
    successRedirect : '/about', 
    failureRedirect : '/login', 
    failureFlash : true
}));

app.get('/signup', function(req, res) {
    res.render('signup.ejs', { 'title': pkg.name, 'buildVersion': pkg.version });
});

app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/about',
    failureRedirect : '/signup', 
    failureFlash : true 
}));


// error handlers - 404 and 500 others check the logs
// catch 400
app.use(function(req, res) {
    res.status(400);
    url = req.url;
    res.render('400.ejs', {title: '400: Bad Request', url: url, statusCode: 400 });
});

//TODO: JMC Fix
app.use(function(req, res) {
    res.status(401);
    url = req.url;
    res.render('400.ejs', {title: '401: Unauthorized', url: url, statusCode: 401 });
});

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404);
    url = req.url;
    res.render('404.ejs', {title: '404: Resource Not Found', url: url, statusCode: 404 });
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    url = req.url;
    logger.error("Error Message: code(500) %s", JSON.stringify(error));
    res.render('error.ejs', {title:'500: Internal Server Error', url: url, statusCode: 500 });
});

function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = app;
