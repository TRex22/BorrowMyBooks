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

try{
	mongoose.connect(config.mongodb, options);
	logger.info("connected to database.");
}
catch(error){
	logger.error("Error connecting to db. Err: "+error);
}

module.exports = 
{
	mongoose : mongoose
};


