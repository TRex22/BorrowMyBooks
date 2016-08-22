'use strict'

var logger = require("./logger/logger");

//This is a db reset script
require('./db/clearDb').go();
require('./db/seedDb').go();

process.exit();