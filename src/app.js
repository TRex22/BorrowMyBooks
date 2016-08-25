'use strict'
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
var session = require('express-session');
var flash = require('req-flash');

var pkg = require('./package.json');
var config = require('./config.json');

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

logger.info("Initialize Authentication");

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: config.secret }));
app.use(flash()); //JMC: TODO add mesages
app.use(passport.initialize());
app.use(passport.session());

logger.info("Build Site Object");
var site = {};
site.buildVersion = pkg.version;
site.defaults = {};


logger.info("Initialize Routes");
var routes = require('./routes/index');
var users = require('./routes/users');
var teapot = require('./routes/teapot');
var admin = require('./routes/admin');
var explore = require('./routes/explore');

app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/teapot', teapot);
app.use('/admin', admin(passport));
app.use('/explore', explore);
//TODO: JMC Fix

require('./routes/accounts.js')(app, passport);
require('./routes/errors.js')(app);

module.exports = app;
