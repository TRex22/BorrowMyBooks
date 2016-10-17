/* jshint node: true */
var logger = require("../logger/logger");
var wrap = require('co-express');

var bookHelper = require('../services/bookHelper.js');
var userHelper = require('../services/userHelper.js');

var mongoose = require('../config/db.js').mongoose;
var Transaction = mongoose.model('Transaction', require('../models/transaction'));

function getTransactions(userId) {
    return new Promise(function(resolve, reject) {
        Transaction.find({ $or: [{ fromUserId: userId }, { toUserId: userId }] }, wrap(function*(err, transactions) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            for (var i = 0; i < transactions.length; i++) {
                var book;
                var toUser;
                var fromUser;

                try {
                    book = yield bookHelper.getBook(transactions[i].bookId);
                    toUser = yield userHelper.getUser(transactions[i].toUserId);
                    fromUser = yield userHelper.getUser(transactions[i].fromUserId);

                    transactions[i].book = book;
                    //todo JMC fix this confusing mess
                    transactions[i].toUser = fromUser;
                    transactions[i].fromUser = toUser;
                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            }

            resolve(transactions);
        }));
    });
}

function getTransactionBooks(userId) {
    return new Promise(function(resolve, reject) {
        Transaction.find({ $or: [{ fromUserId: userId }, { toUserId: userId }] }, wrap(function*(err, transactions) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            var books = {};
            var rentedUsrBooks = [];
            var loanedUsrBooks = [];

            for (var i = 0; i < transactions.length; i++) {
                try {
                    if (transactions[i].toUserId === userId + "") {
                        var loanedUsrBook = yield bookHelper.getBook(transactions[i].bookId);                        
                        rentedUsrBooks.push(loanedUsrBook);
                    }

                    if (transactions[i].fromUserId === userId + "") {
                        var rentedUsrBook = yield bookHelper.getBook(transactions[i].bookId);
                        if (transactions[i].isRent) {
                            loanedUsrBooks.push(rentedUsrBook);
                        }
                    }

                } catch (e) {
                    logger.error(e);
                    reject(e);
                }
            }

            books.rentedUsrBooks = rentedUsrBooks;
            books.loanedUsrBooks = loanedUsrBooks;

            resolve(books);
        }));
    });
}

function getTransaction(transactionId) {
    return new Promise(function(resolve, reject) {
        Transaction.findOne({ _id: transaction }, function(err, transaction) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(transaction);
        });
    });
}

module.exports = {
    getTransactions: getTransactions,
    getTransactionBooks: getTransactionBooks,
    getTransaction: getTransaction
}
