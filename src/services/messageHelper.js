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
    processMessages: processMessages
};
