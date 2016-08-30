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
        email: "contact@jasonchalom.com",
        salt: null,
        hash: null,
        name: "Administrator",
        address: "Room 13",
        phone: "1234567890",
        interests: [],
        picUrl: null,
        userRole: ["admin"],
        lastLoginDate: null,
        registrationDate: new Date()
    });
    iUser.userId = iUser.generateUUID();
    iUser.salt = iUser.generateSalt();
    iUser.hash = iUser.generateHash("123456");
    iUser.save(); //TODO Password
    logger.warn("created admin user");

    iUser = new user({
        username: "User",
        email: "user@jasonchalom.com",
        salt: null,
        hash: null,
        name: "User",
        address: "Room 13",
        phone: "1234567890",
        interests: [],
        picUrl: null,
        userRole: [],
        lastLoginDate: null,
        registrationDate: new Date()
    });
    iUser.userId = iUser.generateUUID();
    iUser.salt = iUser.generateSalt();
    iUser.hash = iUser.generateHash("123456");
    iUser.save(); //TODO Password
    logger.warn("created user");

    var iBook = new book({
        title: "A Book about Tests",
        author: "me",
        userId: "0",
        noAvailable: 1,
        isAvailable: false,
        interests: ["testInterest1"],
        picURL: null,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
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
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    iBook = new book({
        title: "Hearts in Atlantis",
        author: "Stephen King",
        picURL: "https://upload.wikimedia.org/wikipedia/en/7/70/HeartsInAtlantis.gif",
        interests: ["Fantasy"],
        edition: "First Edition",
        userId: "0",
        noAvailable: 1,
        isAvailable: false,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    iBook = new book({
        title: "Odd Thomas",
        author: "Dean Koontz",
        picURL: "https://upload.wikimedia.org/wikipedia/en/7/72/Odd_Thomas.jpg",
        interests: ["Fiction"],
        edition: "second edition",
        userId: "1",
        noAvailable: 33,
        isAvailable: false,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");




    iBook = new book({
        title: "A Book about Tests",
        author: "me",
        userId: "0",
        noAvailable: 1,
        isAvailable: false,
        interests: null,
        picURL: "https://s-media-cache-ak0.pinimg.com/236x/9e/b5/95/9eb595e51d197624cfe12e959179994d.jpg",  //girl who...
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
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
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    iBook = new book({
        title: "Hearts in Atlantis",
        author: "Stephen King",
        picURL: "http://ebookfriendly.com/wp-content/uploads/2014/03/Mr-Mercedes-Stephen-King-animated-book-cover.gif",  //mr merc
        interests: ["Fantasy"],
        edition: "First Edition",
        userId: "0",
        noAvailable: 1,
        isAvailable: false,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    iBook = new book({
        title: "Odd Thomas",
        author: "Dean Koontz",
        picURL: "https://s-media-cache-ak0.pinimg.com/236x/a0/96/ff/a096ff3bafb7786b59ef9ba9d3e7ddf2.jpg",  //mockingbird
        interests: ["Fiction"],
        edition: "second edition",
        userId: "1",
        noAvailable: 33,
        isAvailable: false,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    iBook = new book({
        title: "Odd Thomas",
        author: "Dean Koontz",
        picURL: null,
        interests: ["Fiction"],
        edition: "second edition",
        userId: "1",
        noAvailable: 33,
        isAvailable: false,
        ISBN: null,
        publishDate: new Date("<YYYY-mm-dd>"),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false
    });
    iBook.bookId = iBook.generateUUID();
    iBook.save();
    logger.warn("created book");

    var iSystemDefaults = new systemDefaults({
        DefaultProfilePictureURL: "/assets/avatar.png",
        DefaultBookPictureURL: "/assets/cover.jpg",
        DefaultTheme: "flatly",
        DefaultBrandingText: "Borrow My Books",
        Title: "Borrow My Books"
    });
    iSystemDefaults.save();
    logger.warn("created systemDefaults");


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
