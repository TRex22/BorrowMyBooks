var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var bookSchema = mongoose.Schema({
    bookId: String,
    title: String,
    author: String,
    userId: String,
    noAvailable: Number,
    isAvailable: Boolean,
    interests: [String],
    picURL: String,
    ISBN: String,
    publishDate: Date,
    creationDate: Date,
    language: String,
    edition: String,
    loanPrice: Number,
    sellPrice: Number,
    isForLoan: Boolean,
    isForSale: Boolean,
    isSold: Boolean,
    isOnLoan: Boolean,
    summary: String
}, { strict: false, collection: 'Book' });

bookSchema.methods.generateUUID = function() {
    return uuid.v4();
};

var book = mongoose.model('Book', bookSchema);

module.exports = book;
