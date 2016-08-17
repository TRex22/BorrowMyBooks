var winston = require('winston');
var moment = require('moment');
var fs = require('fs');
var config = require('../config.json');

fs.mkdir('./logs', function(err) {
    //if (err) throw err;
});

winston.emitErrs = true;

var rotateOptions = {
    name: 'file',
    level: 'info',
    filename: config.filePaths.logPath+'/'+config.logFileName,
    datePattern: config.logFileDatePattern,
    handleExceptions: true,
    json: true,
    maxsize: config.logFileMaxSize,
    maxFiles: config.logFileMaxFiles,
    colorize: true,
    prettyPrint: true
};

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'notice', //debug is too verbose { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new (require('winston-daily-rotate-file'))(rotateOptions)
    ],
    exitOnError: false
});

/*TODO JMC add other transports like loggly and email, maybe trello? and github*/
/*log-file-remover*/

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};