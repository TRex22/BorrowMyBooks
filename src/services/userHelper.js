var mongoose = require('../config/db.js').mongoose;
var User = mongoose.model('User', require('../models/user'));
var UserLog = mongoose.model('UserLog', require('../models/userLog'));
var Transaction = mongoose.model('Transaction', require('../models/transaction'));
var userReport = mongoose.model('UserReport', require('../models/userReport'));
var userRating = mongoose.model('UserRating', require('../models/userRating'));
var schoolDomain = mongoose.model('SchoolDomain', require('../models/schoolDomain'));

var wrap = require('co-express');
var co = require('co');

var messageHelper = require('../services/messageHelper');
var util = require('util');

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

    if (!req.route) {
        req.params = null;
        req.route = {};
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

    if (logout) {
        req.session.user = resetUser();
        req.user = resetUser();
        req.session.returnTo = "";
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

    schoolDomain.findOne({}, function(err, domainObj) {
        var isStudent = domainObj.isStudentEmail(iUser.email);
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

        if (isStudent) {
            iUser.money = 1000;
            iUser.isStudent = true;
        } else {
            iUser.money = 0;
            iUser.isStudent = false;
        }

        iUser.userId = iUser.generateUUID();
        iUser.salt = iUser.generateSalt();
        iUser.hash = iUser.generateHash(password);

        return iUser;
    });
}

/* istanbul ignore next */
function getPath(req) {
    var path = "/"

    if (req.route) {
        if (req.params.length > 0) {
            if (req.route.path.indexOf("buy") > -1 || req.route.path.indexOf("rent") > -1 || req.route.path.indexOf("return") > -1) {
                path = "/transaction/mine/";
                return path;
            }

            if (req.route.path.indexOf("reply") > -1) {
                path = "/profile/messages";
                return path;
            }

            if (req.route.path.indexOf(":bookId") > -1 || req.route.path.indexOf(":userId/reports") > -1 || req.route.path.indexOf(":transactionId") > -1 || req.route.path.indexOf(":userId") > -1 || req.route.path.indexOf(":messageId") > -1) {
                path = "/"
                return path;
            }

            if (req.route.path.indexOf("userId") > -1) {
                path = "/user/" + req.params.userId;

                if (req.route.path.indexOf("settings") > -1) {
                    path += "/settings";
                }

                return path;
            }
        } else {
            path = req.route.path;
        }
    }

    return path;
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
            if (req.session) {
                req.session.returnTo = getPath(req);
            }
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

function getUsers() {
    return new Promise(function(resolve, reject) {
        User.find({}, function(err, users) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(users);
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

function findUsername(userIdent) {
    return new Promise(function(resolve, reject) {
        User.findOne({ username: userIdent }, function(err, user) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(user);
        });
    });
}

function logUserAction(log, userId, bookId, transactionId, messageId) {
    var userLog = require('../models/userLog');
    var log = new userLog({
        log: log,
        date: new Date(),
        userId: userId,
        bookId: bookId,
        transactionId: transactionId,
        messageId: messageId
    });

    log.save();
}

function getUserLog(userId) {
    return new Promise(function(resolve, reject) {
        UserLog.find({ userId: userId }).sort({ date: -1 }).exec(function(err, log) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(log);
        });
    });
}

function searchUserLog(userId, searchTerm) {
    return new Promise(function(resolve, reject) {
        UserLog.find({ $and: [{ userId: userId }, { log: { $regex: ".*" + searchTerm + ".*" } }] }).sort({ date: -1 }).exec(function(err, log) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(log);
        });
    });
}

function getUserActivity(userId) {
    return new Promise(function(resolve, reject) {
        Transaction.find({ $or: [{ fromUserId: userId }, { toUserId: userId }] }, wrap(function*(err, userTransactions) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            var sold = 0;
            var lent = 0;

            var bought = 0;
            var rented = 0;
            var returned = 0;

            var rating = 0;

            for (var i = 0; i < userTransactions.length; i++) {
                if (userTransactions[i].fromUserId === "" + userId) {
                    if (userTransactions[i].isPurchase) {
                        sold += userTransactions[i].amount;
                    } else if (userTransactions[i].isRent) {
                        lent += userTransactions[i].amount;
                    }
                }
                if (userTransactions[i].toUserId === "" + userId) {
                    if (userTransactions[i].isPurchase) {
                        bought += userTransactions[i].amount;
                    } else if (userTransactions[i].isRent) {
                        rented += userTransactions[i].amount;
                    }
                }

                if (userTransactions[i].hasBeenReturned) {
                    returned += userTransactions[i].amount - userTransactions[i].amountToReturn;
                }
            }

            userRating.find({ userId: userId }, function(err, ratings) {
                if (err) {
                    return reject(err);
                }

                var sum = 0.0;

                for (var i = 0; i < ratings.length; i++) {
                    sum += parseInt(ratings[i].Rating);
                }

                rating = parseInt(sum / ratings.length);

                if (rating === 'NaN') {
                    rating = 0;
                }

                if (ratings.length === 0) {
                    rating = "not yet rated";
                }

                var obj = {
                    sold: sold,
                    lent: lent,
                    bought: bought,
                    rented: rented,
                    returned: returned,
                    rating: rating
                };

                resolve(obj);
            });

        }));

    });
}

function getUserReports(userId) {
    return new Promise(function(resolve, reject) {
        userReport.find({ userId: userId }).sort({ date: -1 }).exec(function(err, reports) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            resolve(reports);
        });
    });
}

function getReportedUsers() {
    return new Promise(function(resolve, reject) {
        userReport.find({}).sort({ date: -1 }).exec(function(err, reports) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            var closedReports = [];
            var openReports = [];

            for (var i = 0; i < reports.length; i++) {
                if (reports[i].reportClosed) {
                    closedReports.push(reports[i]);
                } else {
                    openReports.push(reports[i]);
                }
            }

            var userReports = {
                openReports: openReports,
                closedReports: closedReports
            };
            resolve(userReports)
        });
    });
}

function updateUserMoney(userId, money) {
    return new Promise(function(resolve, reject) {
        user.findOne({ _id: userId },
            function(err, user) {
                /* istanbul ignore next */
                if (err) {
                    logger.error(err);
                }

                user.money -= parseFloat(money);
                user.save();

                resolve(true);
            }
        );

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
    getUsers: getUsers,
    findUser: findUser,
    findUsername: findUsername,
    getPath: getPath,
    logUserAction: logUserAction,
    getUserLog: getUserLog,
    searchUserLog: searchUserLog,
    getUserActivity: getUserActivity,
    getUserReports: getUserReports,
    getReportedUsers: getReportedUsers,
    updateUserMoney: updateUserMoney
}
