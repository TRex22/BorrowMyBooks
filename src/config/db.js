var pkg = require('../package.json');
var config = require('../config.json');
var logger = require("../logger/logger");

var options = {
    /*db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },*/
    /* user: config.mongoUser,
     pass: config.mongoPassword*/
    //TODO JMC Fix add db user
}

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
try {
    if (process.env.NODE_ENV === 'test') {
        logger.info("test db");
        mongoose.connect(config.mongodbTest, options);
        logger.info("connected to database.");
    } else if (process.env.NODE_ENV === 'production') {
        logger.info("production db");
        mongoose.connect(process.env.MONGODB_URI, options); //heroku deploy
        logger.info("connected to database.");
    } else {
        logger.info("development db");
        mongoose.connect(config.mongodb, options);
        logger.info("connected to database.");
    }

} catch (error) {
    logger.error("Error connecting to db. Err: " + error);
}

module.exports = {
    mongoose: mongoose
};
