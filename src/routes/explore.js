/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO: JMC database connection
    //also system defaults for alt
    var json = [{
            "title": "Hearts in Atlantis",
            "author": "Stephen King",
            "picURL": "https://upload.wikimedia.org/wikipedia/en/4/49/Dewey_-_The_Small-Town_Library_Cat_Who_Touched_the_World_(book_cover).jpg",
            "interests": "Fantasy",
            "edition": "Best edition"
        },

        {
            "title": "Odd Thomas",
            "author": "Dean Koontz",
            "picURL": "https://upload.wikimedia.org/wikipedia/en/4/49/Dewey_-_The_Small-Town_Library_Cat_Who_Touched_the_World_(book_cover).jpg",
            "interests": "Fiction",
            "edition": "Great edition"
        }
    ];
    res.render('explore', { title: 'Borrow My Books', buildVersion: pkg.version, books: json });
});

module.exports = router;
