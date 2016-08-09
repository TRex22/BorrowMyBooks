var pkg = require('../package.json');
var config = require('../config.json');

var options = {
    /*db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },*/
    user: config.mongoUser,
    pass: config.mongoPassword
}

var mongoose = require('mongoose');
mongoose.connect(config.mongodb, options);

function seedDb() {
    //check dev environment
}
module.exports = seedDb;
