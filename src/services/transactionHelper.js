/* jshint node: true */
var logger = require("../logger/logger");
var wrap = require('co-express');

var bookHelper = require('../services/bookHelper.js');

var mongoose = require('../config/db.js').mongoose;
var Transaction = mongoose.model('Transaction', require('../models/transaction'));

function getTransactions(userId) {
    return new Promise(function(resolve, reject) {
    	console.log("in transaction");
        Transaction.find({ $or: [{ fromUserId: userId }, { toUserId: userId }] }, wrap(function*(err, transactions) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            for (var i = 0; i < transactions.length; i++) {
            	var book;

            	try{
            		book = yield bookHelper.getBook(transactions[i].bookId);
            		
            		transactions[i].book = book;            		
            	} catch(e) {
            		reject(e);
            	}                
            }

            resolve(transactions);
        }));
    });
}

module.exports = {
    getTransactions: getTransactions
}
