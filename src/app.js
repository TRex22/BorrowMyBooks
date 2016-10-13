'use strict'
/* jshint node: true */

/*
logger.
  warn
  error
  debug
*/

process.env.PWD = process.cwd();
var directory = process.env.PWD;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    directory = directory + '/src';
}

var logger = require("./logger/logger");
logger.info("mongoose setup...");
// mongoose setup
require('./config/db');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
/*var async = require('async');*/

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('req-flash');
var toastr = require('express-toastr');

var pkg = require('./package.json');
var config = require('./config.json');
var siteBuilder = require('./services/siteBuilder');
var userHelper = require('./services/userHelper');
var co = require('co');

var app = express();

logger.info("Overriding 'Express' logger");
app.use(require('morgan')("combined", { "stream": logger.stream }));

co(function*(){
    var admin = yield userHelper.findUser("Admin");
    if(!admin){
        logger.warn("Emergency db Rebuild");
        require('./db/seedDb');
    }
});

// view engine setup
app.set('views', path.join(directory, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info('Connected IP:', ip);
    next();
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(directory, 'public')));
    app.use(favicon(path.join(directory, 'public', 'favicon.ico')));
    app.use('/bower_components', express.static(path.join(directory, '/bower_components')));
    /*    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));*/ //TODO look at adding
} else {
    app.use(express.static('public'));
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
    /*    app.use(express.errorHandler());*/
}

logger.info("Initialize Authentication");

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(session({
    cookieName: 'session',
    secret: config.secret,
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

// Load express-toastr
// You can pass an object of default options to toastr(), see example/index.coffee
app.use(toastr({
    closeButton: true,
    newestOnTop: true
}));


app.use(function(req, res, next) {
    req.toastr.clear(); //fix for undefined error in ejs
    res.locals.toasts = req.toastr.render();
    next();
});

logger.info("passport setup...");
var passport = require('passport');
require('./config/passport')(app, passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('connect-livereload')());

logger.info("Build Site Object");
app.locals.site = siteBuilder.initSite();
app.locals.site = siteBuilder.updateSite(app); //to make sure there is a site object even if db fails

logger.info("Initialize Routes");

var teapot = require('./routes/teapot');
app.use('/teapot', teapot);

require('./routes/index.js')(app, passport);
require('./routes/admin.js')(app, passport);
require('./routes/explore.js')(app, passport);
require('./routes/book.js')(app, passport);
require('./routes/accounts.js')(app, passport);
require('./routes/transaction.js')(app, passport);
require('./routes/messages.js')(app, passport);
require('./routes/rate.js')(app, passport);
require('./routes/errors.js')(app);

module.exports = app;
