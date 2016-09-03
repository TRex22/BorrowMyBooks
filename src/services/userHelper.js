function initUser(req) {
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
    /*iUser.save();*/
    //todo detect student
    return iUser;
}

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
            return true; //next();
        }
    } else {
        if (!sysinfo) {
            res.redirect('/login');
        }
        return false;
    }
}

module.exports = {
    isAdmin: isAdmin,
    processUser: processUser,
    resetUser: resetUser,
    initUser: initUser,
    auth: auth,
    createNewUser: createNewUser
}
