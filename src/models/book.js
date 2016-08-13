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
});

var book = mongoose.model('Book', bookSchema);

/*function find(book) {
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Message.find().sort('date', -1).execFind(function (arr,data) {
    return data;
  });
}*/

function post(book) {
  // Create a new message model, fill it up and save it to Mongodb

  book.creationDate = new Date();
  book.save(function () {
    
  });
}

module.exports = 
{
    book: book,
    post: post
}   
