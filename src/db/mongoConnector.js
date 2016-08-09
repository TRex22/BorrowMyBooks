var logger = require("./logger/logger");
var config = require("../config.json");
var MongoClient = require('mongodb').MongoClient;

//manual connection, maybe  use?

MongoClient.connect(config.mongodb, function(err, db) {
  if(!err) {
    logger.info("Connected to database");
  }
  else
  {
  	logger.error("Error: " + err);
  }
});