/* jshint node: true */
var logger = require("../logger/logger");

var wrap = require('co-express');

var util = require('util');

var mongoose = require('../config/db.js').mongoose;
var Book = mongoose.model('Book', require('../models/book'));

function getBook(bookId) {
    return new Promise(function(resolve, reject) {
        Book.findOne({ _id: bookId }, function(err, book) {
            /* istanbul ignore next */
            if (err) {
                logger.error(err);
                return reject(err);
            }

            resolve(book);
        });
    });
}

var getRelatedBooks = wrap(function*(bookId) {
    //using interests and then price
    var book = yield getBook(bookId);
    var interests = book.interests
    if(!util.isArray(interests)){
        interests = [interests];
    }

    return new Promise(function(resolve, reject) {
        Book.find({ $and: [{ _id: { $ne: book._id } }, { interests: { $elemMatch: { $in: interests } } }] }).exec(function(err, relatedBooks) {
            /* istanbul ignore next */
            if (err) {
                logger.error(err);
                return reject(err);
            }

            resolve(relatedBooks);
        });
    });
});

function convertToISBN13(ISBN10) {

}

function convertToISBN10(ISBN13) {
    //must begin with 978

}

/*
Wikipedia gives it as

Remove the ISBN 10 check digit from the end
Add 978 to the front
Add the ISBN-13 check digit to the end
The check digit is calculated as per Wikipedia

Take each digit as an element in in an array x_ i.e. the ith digit i the ISBM is x_i e.g. x4 is the 4th digit.
Multiply the even digits by 3 and sum these.
add these to the sum of the odd digits
find the remainder mod 10
subtract from 10 (you have a number 1-10)
This is the result as a number between 1 and 10, unless the figure is 10 then the result is 0

x_13 = (10 - (x_1 + 3x_2 + x_3 + 3x_4 + ... + x_11 + 3x_12) mod10 ) mod 10
*/

function getAmazonBookCover(ISBN) {
    var url = "http://images.amazon.com/images/P/" + ISBN;
    //eg ISBN 0738202967 isbn-10
    //http://images.amazon.com/images/P/0738202967
    url = "http://images.amazon.com/images/P/" + 0738202967;
    ISBN = 0738202967;

    //remove dashes    

}

module.exports = {
    getAmazonBookCover: getAmazonBookCover,
    getBook: getBook,
    getRelatedBooks: getRelatedBooks
}
