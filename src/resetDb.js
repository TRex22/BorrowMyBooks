var clearDb = require('./db/clearDb').go();
//wait 2 seconds
console.log("Please wait 2 seconds.")
setTimeout(function() {
    var seed = require('./db/seedDb');
}, 2000);
