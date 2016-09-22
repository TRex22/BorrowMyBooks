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
/*    isSold: Boolean,*/
/*    isOnLoan: Boolean,*/
    summary: String
}, { strict: false, collection: 'Book' });


//Validated schema. Commented out because dont know how to pass to front-end.
/*var bookSchema = mongoose.Schema({
    bookId: String,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: String,
    noAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    isAvailable: Boolean,
    interests: [String],
    picURL: String,
    ISBN: {
        type: String,
        required: true
    },
    publishDate: Date,
    creationDate: Date,
    language: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    loanPrice: {
        type: Number,
        required: true,
        min: 0
    },
    sellPrice: {
        type: Number,
        required: true,
        min: 0
    },
    isForLoan: Boolean,
    isForSale: Boolean,
//    isSold: Boolean,
//    isOnLoan: Boolean,
    summary: {
        type: String,
        required: true
    },
}, { strict: false, collection: 'Book' });*/

bookSchema.methods.generateUUID = function() {
    return uuid.v4();
};

var book = mongoose.model('Book', bookSchema);

module.exports = book;
