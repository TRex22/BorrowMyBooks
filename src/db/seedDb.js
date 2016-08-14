var mongoose = require('mongoose');
var logger = require("../logger/logger");
var config = require("../config.json");

var user = require('../models/user');
var book = require('../models/book');
var interest = require('../models/interest');
var transaction = require('../models/transaction');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');
var userRating = require('../models/userRating');

function go() {
    //check dev environment
    var iUser = new user({
        username: "Admin",
        userId: "1",
        email: "contact@jasonchalom.com",
        salt: null,
        hash: null,
        name: "Administrator",
        address: "Room 13",
        phone: "1234567890",
        interests: [],
        PicUrl: null,
        UserRole: ["admin"],
        LastLoginDate: null,
        RegistrationDate: new Date()
    });
    iUser.save(); //TODO Password

    var iBook = new book({
        bookId: "1234",
        title: "A Book about Tests",
        author: "me",
        userId: "0",
        noAvailable: 1,
        isAvailable: false,
        interests: null,
        picURL: null,
        ISBN: null,
        date: new Date(),
        creationDate: new Date(),
        language: "English",
        edition: "1",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.save();

/*    var iInterest = new interest({
        InterestId: String,
        InterestName: String,
        InterestDescription: String
    });
    var iInterest.save();*/

    /*var iTransaction = new transaction({

    });
    iTransaction.save();*/

    /*var iSystemMessage = new systemMessage({

    });
    iSystemMessage.save();*/

    /*var iUserMessage = new userMessage({

    });
    iUserMessage.save();*/

   /* var iSystemDefaults = new systemDefaults({
        DefaultProfilePictureURL: String,
        DefaultBookPictureURL: String
    });
    iSystemDefaults.save();*/

/*    var iUserRole = new userRole({
        RoleId: String,
        RoleName: String,
        RoleDescription: String
    });
    iUserRole.save();*/

/*    var iUserRating = new userRating({

    });
    iUserRating.save();*/
}
module.exports = { go: go };
