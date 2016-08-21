var pkg = require('../package.json');
var config = require('../config.json');

var options = {
    /*db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },*/
   /* user: config.mongoUser,
    pass: config.mongoPassword*/
    //TODO JMC Fix add db user
}

var mongoose = require('mongoose');
mongoose.connect(config.mongodb, options);

module.exports = 
{
	mongoose : mongoose
};


