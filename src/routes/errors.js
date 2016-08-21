var logger = require("../logger/logger");
var pkg = require('../package');

// error handlers - 404 and 500 others check the logs
// catch 400
// route to display versions
module.exports = function(app) {
    // catch 404 and forward to error handler
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(404);
        url = req.url;
        res.render('404.ejs', { title: '404: Resource Not Found', url: url, statusCode: 404, 'buildVersion': pkg.version });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(400);
        url = req.url;
        res.render('400.ejs', { title: '400: Bad Request', url: url, statusCode: 400, 'buildVersion': pkg.version });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    app.use(function(req, res) {
        res.status(401);
        url = req.url;
        res.render('401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, 'buildVersion': pkg.version });
    });
    /* istanbul ignore next */ //TODO: JMC think about this
    // Handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        url = req.url;
        logger.error("Error Message: code(500) %s", error);
        res.render('error.ejs', { title: '500: Internal Server Error', url: url, statusCode: 500, 'buildVersion': pkg.version });
    });
};
