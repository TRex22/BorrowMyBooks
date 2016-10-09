var mongoose = require('../config/db.js').mongoose;
var User = mongoose.model('User', require('../models/user'));
var UserMessage = mongoose.model('UserMessage', require('../models/userMessage'));
var SystemMessage = mongoose.model('SystemMessage', require('../models/systemMessage'));

var util = require('util');

function getSystemMessages(userId, isAdmin) {
    return new Promise(function(resolve, reject) {
        SystemMessage.find({}, function(err, systemMessages) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            if (!systemMessages) {
                systemMessages = {}
            }

            resolve(systemMessages);
        });
    });
}

function getUserMessages(userId, isAdmin) {
    return new Promise(function(resolve, reject) {
        var searchQuery = [{}];
        if (isAdmin) {
            searchQuery = [{ ToUserId: userId }, { ToUserId: userId }, { AdminId: userId }];
        } else {
            searchQuery = [{ ToUserId: userId }, { ToUserId: userId }];
        }


        UserMessage.findOne({ $or: searchQuery }, function(err, userMessages) {
            /* istanbul ignore next */
            if (err) {
                return reject(err);
            }

            if (!userMessages) {
                userMessages = {}
            }

            resolve(userMessages);
        });
    });
}


function processMessages(req) {
    //sucess
    var success = req.flash('success');
    if (success) {
        req.toastr.success(success);
    }

    //info
    var info = req.flash('info');
    if (info) {
        req.toastr.info(info);
    }

    //warn
    var warn = req.flash('warn');
    if (warn) {
        req.toastr.warning(warn);
    }

    //error
    var error = req.flash('error');
    if (error) {
        req.toastr.error(error);
    }

    return req;
}

module.exports = {
    processMessages: processMessages,
    getSystemMessages: getSystemMessages,
    getUserMessages: getUserMessages
};
