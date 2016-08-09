var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    book: {
        BookId: String,
        Title: String,
        Author: String,
        UserId: String,
        NoAvailable: Number,
        isAvailable: Boolean,
        InterestId: [String],
        PicURL: String,
        ISBN: String,
        Year: String,
        Language: String,
        Edition: String,
        LoanPrice: Number,
        SellPrice: Number,
        isForLoan: Boolean,
        isForSale: Boolean,
        isSold: Boolean,
        isOnLoan: Boolean
    }
});

module.exports = mongoose.model('Book', bookSchema);
