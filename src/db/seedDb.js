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
    iUser.save(); 
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
    iUser.save(); 
    logger.warn("created user");

    var iBook = new book({
        title: "A Book about Tests",
        author: "me",
        userId: "0",
        noAvailable: 1,
        isAvailable: true,
        interests: ["testInterest1"],
        picURL: null,
        ISBN: null,
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        edition: "1",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: true,
        isSold: false,
        isOnLoan: false,
        summary: "This is a test summary about testing tests."
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
        isAvailable: true,
        ISBN: "978-0-684-85351-2",
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: true,
        isForSale: false,
        isSold: false,
        isOnLoan: false,
        summary: "The stories are about the baby boomer generation, specifically King's view that this generation (to which he belongs) failed to live up to its promise and ideals. Significantly, the opening epigraph of the collection is the Peter Fonda line from the end of Easy Rider: \x22We blew it.\x22 All of the stories are about the 1960s and the war in Vietnam, and in all of them the members of that generation fail profoundly, or are paying the costs of some profound failure on their part."
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
        isAvailable: true,
        ISBN: "0-553-58449-9",
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: true,
        isForSale: true,
        isSold: false,
        isOnLoan: false,
        summary: "In the beginning of the book, Odd Thomas is silently approached by the ghost of a young girl brutally raped and murdered, and through his unique ability to understand the dead, is psychically led to her killer, a former schoolmate named Harlo Landerson. With this opening, we are introduced to Odd's world. Koontz soon discloses how Odd was named and begins, layer by layer, to show how Odd's dysfunctional upbringing has shaped his life, and as those details are uncovered, his supernatural abilities begin to make more sense. We see Odd at work as a short order cook in a California desert town, and in a fateful 24-hour period, he meets a suspicious-looking man in the diner followed by bodachs, shadowy spirit creatures who appear only during times of death and disaster. This man, who Odd nicknames \x22Fungus Man\x22 (due to his waxy complexion and blond hair that resembles mold), has an unusually large swarm of bodachs following him, and Odd is convinced that this man is connected to some terrible catastrophe that is about to occur. To gather more information about him, Odd uses his gift of supernatural intuition, which his soulmate Bronwen (a.k.a. Stormy) Llewellyn calls \x22psychic magnetism,\x22 to track him down. Odd's sixth sense leads him to Fungus Man's home, and Odd begins to uncover more details about the man and a mysterious other-worldly link to the dark forces about to be unleashed on the town of Pico Mundo. Accompanied sometimes by the ghost of Elvis Presley and encountering other memorable spirits, including a murdered prostitute, Odd is soon deeply involved in an attempt to prevent the disastrous bloodshed he knows will happen the next day."
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
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        edition: "1",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false,
        summary: "This is a test summary about testing tests."
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
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: true,
        isForSale: true,
        isSold: false,
        isOnLoan: false,
        summary: "This is a test summary about testing tests."
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
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false,
        summary: "This is a test summary about testing tests."
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
        publishDate: new Date(),
        creationDate: new Date(),
        language: "English",
        loanPrice: 500,
        sellPrice: 600,
        isForLoan: false,
        isForSale: false,
        isSold: false,
        isOnLoan: false,
        summary: "This is a test summary about testing tests."
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
