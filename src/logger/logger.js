var winston = require('winston');
var moment = require('moment');
var fs = require('fs');
var config = require('../config.json');

fs.mkdir('./logs', function(err) {
    //if (err) throw err;
});

winston.emitErrs = true;

var consoleOptions = {
    level: 'info', //debug is too verbose { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    handleExceptions: true,
    json: false,
    colorize: true,    
    prettyPrint: true
};

var rotateOptions = {
    name: 'file',
    level: 'warn', //debug is too verbose { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    filename: config.filePaths.logPath + '/' + config.logFileName,
    datePattern: config.logFileDatePattern,
    handleExceptions: true,
    json: true,
    maxsize: config.logFileMaxSize,
    maxFiles: config.logFileMaxFiles,
    colorize: true,
    prettyPrint: true
};

var logger = loggerFn();

function loggerFn(console_config) {
/*    if (process.env.NODE_ENV !== 'test') {
        consoleOptions = {
            level: 'warn', //debug is too verbose { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
            handleExceptions: true,
            json: false,
            colorize: true,            
            prettyPrint: true
        };
    }*/

    var _logger = new winston.Logger({
        transports: [
            new winston.transports.Console(consoleOptions),
            new(require('winston-daily-rotate-file'))(rotateOptions)
        ],
        exitOnError: false
    });

    return _logger;
}

/*TODO JMC add other transports like loggly and email, maybe trello? and github*/
/*log-file-remover*/

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};
