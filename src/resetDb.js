/*var clearDb = require('./db/clearDb').go();*/
/*var seed = require('./db/seedDb');

setTimeout(function() {
    process.exit();
}, 5000);
*/

var clearDb = require('./db/clearDb').go();
//wait 2 seconds

setTimeout(function() {
    var seed = require('./db/seedDb');
}, 2000);