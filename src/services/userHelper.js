var mongoose = require('../config/db.js').mongoose;
var User = mongoose.model('User', require('../models/user'));

var messageHelper = require('../services/messageHelper');

function initUser(req) {
    if (!req.session) {
        req.session = {};
    }

    if (!req.session.user) {
        req.session.user = {};
        req.session.user.isAdmin = false;
        req.session.user.isLoggedIn = false;
    }

    if (!req.user) {
        req.user = {};
        req.user.isAdmin = false;
        req.user.isLoggedIn = false;
    }

    return req;
}

function processUser(req, logout) {
    if (!req) {
        req = {};
        req.session = {};
    }

    if (!req.user) {
        req = initUser(req);
    } else {
        req.session.user = req.user;
        req.session.user.isAdmin = isAdmin(req.session.user);
        req.session.user.isLoggedIn = true;
        req.user.isAdmin = isAdmin(req.user);
        req.user.isLoggedIn = true;
    }

    /*    if(req.user.picUrl === null){
            req.user.picUrl = 
        }*/

    if (logout) {
        req.session.user = resetUser();
        req.user = resetUser();
    }

    if (req.flash) {
        req = messageHelper.processMessages(req);
    }

    return req;
}

function isAdmin(user) {
    if (user && user.userRole) return user.userRole.indexOf('admin') > -1;
    return false;
}

function resetUser() {
    user = {};
    user.isAdmin = false; //security
    user.isLoggedIn = false;
    user.userRole = [];
    user.userRole = null;

    return user;
}

function createNewUser(username, password, body) {
    var userModel = require('../models/user');
    var iUser = new userModel({
        username: username,
        email: body.email,
        salt: null,
        hash: null,
        name: body.name,
        address: body.address,
        phone: body.phone,
        interests: body.interests,
        picUrl: null,
        userRole: [],
        lastLoginDate: new Date(),
        registrationDate: new Date()
    });

    iUser.userId = iUser.generateUUID();
    iUser.salt = iUser.generateSalt();
    iUser.hash = iUser.generateHash(password);

    //todo detect student
    return iUser;
}

/* istanbul ignore next */
function auth(req, res, site, admin, sysinfo) {
    if (req.user) {
        /*        if(!req.user.isLoggedIn){
                    res.redirect('/login');
                }*/
        if (!isAdmin(req.user) && admin) {
            res.status(401);
            url = req.url;
            req = processUser(req);
            if (!sysinfo) {
                res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: site, user: req.user });
            }
            return false;

        } else {
            return true;
        }
    } else {
        if (!sysinfo) {
            res.redirect('/login');
        }
        return false;
    }
}

function getUser(userId) {
    return new Promise(function(resolve, reject) {
        User.findOne({ _id: userId }, function(err, user) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(user);
        });
    });
}

function findUser(userIdent) {
    return new Promise(function(resolve, reject) {
        User.findOne({ $or: [{ username: userIdent }, { email: userIdent }, { name: userIdent }] }, function(err, user) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(user);
        });
    });
}

module.exports = {
    isAdmin: isAdmin,
    processUser: processUser,
    resetUser: resetUser,
    initUser: initUser,
    auth: auth,
    createNewUser: createNewUser,
    getUser: getUser,
    findUser: findUser
}
