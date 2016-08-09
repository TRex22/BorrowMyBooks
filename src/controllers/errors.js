var logger = require("../logger/logger");

// error handlers - 404 and 500 others check the logs
// catch 400
// route to display versions
module.exports = function(app) {
    app.use(function(req, res) {
        res.status(400);
        url = req.url;
        res.render('400.ejs', { title: '400: Bad Request', url: url, statusCode: 400 });
    });

    //TODO: JMC Fix
    app.use(function(req, res) {
        res.status(401);
        url = req.url;
        res.render('400.ejs', { title: '401: Unauthorized', url: url, statusCode: 401 });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        res.status(404);
        url = req.url;
        res.render('404.ejs', { title: '404: Resource Not Found', url: url, statusCode: 404 });
    });

    // Handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        url = req.url;
        logger.error("Error Message: code(500) %s", JSON.stringify(error));
        res.render('error.ejs', { title: '500: Internal Server Error', url: url, statusCode: 500 });
    });
};
