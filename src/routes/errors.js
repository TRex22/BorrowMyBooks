var logger = require("../logger/logger");
var pkg = require('../package');

var mongoose = require('../config/db.js').mongoose;

// error handlers - 404 and 500 others check the logs
// catch 400
// route to display versions
module.exports = function(app) {
    // catch 404 and forward to error handler
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(404);
        url = req.url;
        res.render('404.ejs', { title: '404: Resource Not Found', url: url, statusCode: 404, site: app.locals.site });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(400);
        url = req.url;
        res.render('400.ejs', { title: '400: Bad Request', url: url, statusCode: 400, site: app.locals.site });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(401);
        url = req.url;
        res.render('401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    // Handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        url = req.url;
        res.render('error.ejs', { title: '500: Internal Server Error', url: url, statusCode: 500, site: app.locals.site });
        logger.error("Error Message: code(500) %s", error);
    });
};
