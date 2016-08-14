global.chai = require('chai');
global.expect = global.chai.expect;
//global.app = require('../index')
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';
