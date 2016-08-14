var mongoose = require('../config/db.js').mongoose;

var bookSchema = mongoose.Schema({
    book: {
        bookId: String,
        title: String,
        author: String,
        userId: String,
        noAvailable: Number,
        isAvailable: Boolean,
        interestId: [String],
        picURL: String,
        ISBN: String,
        date: Date,
        creationDate: Date,
        language: String,
        edition: String,
        loanPrice: Number,
        sellPrice: Number,
        isForLoan: Boolean,
        isForSale: Boolean,
        isSold: Boolean,
        isOnLoan: Boolean
    }
}, { strict: false, collection: 'Book' });

var book = mongoose.model('Book', bookSchema);

module.exports = book;