var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../../config');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')
var validator = require('validator');

var app = require('../../app');
var www = require('../../bin/www-test');

var mongoose = require('../../config/db.js').mongoose;
var systemDefaults = require('../../models/systemDefaults');
var sysDefault = mongoose.model('SystemDefaults', systemDefaults);
var book = require('../../models/book');
var Book = mongoose.model('Book', book);
var User = mongoose.model('User', require('../../models/user'));

var clear = require('../../db/clearDb');

/*js to test*/

//setup
chai.use(chaiHttp);

describe('#Admin Route', function() {
    beforeEach(function*() {
        clear.go();
        var seed = require('../../db/seedDb');
        this.timeout(3000);
    });
    
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/book')
            .end(function(err, res) {
                res.should.have.status(404); //nothing here
                done();
            });
    });

    it('should respond to GET for a book', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                chai.request(app)
                    .get('/book/' + book._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        res.res.client._httpMessage.path.should.be.equal("/book/" + book._id);
                        done();
                    });
            } else {
                throw err;
            }
        });

    });

    it('should respond to GET for an unknown book, not find the book and redirect back to explore', function(done) {
        chai.request(app)
            .get('/book/' + "57e67e6d6515d73854cb51f0")
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/explore'); //redirect
                done();
            });
    });

    it('should respond to buy post not logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                chai.request(app)
                    .post('/book/' + book._id + '/buy')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects[0].should.contain('/login'); //redirect
                        done();
                    });
            } else {
                throw err;
            }
        });
    });

    it('should respond to buy post logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                request(app)
                    .post('/login?username=Admin&password=123456')
                    .send({ username: "Admin", password: '123456' })
                    .end(function(err, res) {
                        res.should.have.status(302);
                        var cookie = res.headers['set-cookie'];
                        cookie.should.have.elements;
                        request(app)
                            .post('/book/' + book._id + '/buy')
                            .set('cookie', cookie)
                            .end(function(err, res) {
                                res.should.have.status(302);
                                res.redirects.should.be.empty; //redirect
                                //TODO: JMC more ridgid tests
                                done();
                            });
                    });
            } else {
                throw err;
            }
        });
    });

    it('should respond to rent post not logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                chai.request(app)
                    .post('/book/' + book._id + '/rent')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects[0].should.contain('/login'); //redirect
                        done();
                    });
            } else {
                throw err;
            }
        });
    });

    it('should respond to rent post logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                request(app)
                    .post('/login?username=Admin&password=123456')
                    .send({ username: "Admin", password: '123456' })
                    .end(function(err, res) {
                        res.should.have.status(302);
                        var cookie = res.headers['set-cookie'];
                        cookie.should.have.elements;
                        chai.request(app)
                            .post('/book/' + book._id + '/rent')
                            .set('cookie', cookie)
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.redirects[0].should.contain('/book/' + book._id); //redirect
                                //TODO: JMC more ridgid tests
                                done();
                            });
                    });
            } else {
                throw err;
            }
        });
    });

    it('should respond to return post not logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                chai.request(app)
                    .post('/book/' + book._id + '/return')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects[0].should.contain('/login'); //redirect
                        done();
                    });
            } else {
                throw err;
            }
        });
    });

    it('should respond to return post logged in', function(done) {
        Book.findOne({}, function(err, book) {
            if (book) {
                request(app)
                    .post('/login?username=Admin&password=123456')
                    .send({ username: "Admin", password: '123456' })
                    .end(function(err, res) {
                        res.should.have.status(302);
                        var cookie = res.headers['set-cookie'];
                        cookie.should.have.elements;
                        chai.request(app)
                            .post('/book/' + book._id + '/return')
                            .set('cookie', cookie)
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.redirects[0].should.contain('/book/' + book._id); //redirect
                                //TODO: JMC more ridgid tests
                                done();
                            });
                    });
            } else {
                throw err;
            }
        });
    });

});
