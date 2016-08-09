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

var routes = require('./routes/index');
var users = require('./routes/users');
var teapot = require('./routes/teapot');
var admin = require('./routes/admin');

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

require('./db/seedDb').go();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));*/

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: config.secret }));
app.use(flash()); //JMC: TODO add mesages
app.use(passport.initialize());
app.use(passport.session());

app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/teapot', teapot);
app.use('/admin', admin);

//TODO: JMC Fix
require('./controllers/accounts.js')(app, passport);
require('./controllers/errors.js')(app);

function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = app;
