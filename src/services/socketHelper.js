var logger = require("../logger/logger");
var config = require('../config');
var io = require('socket.io');
var os = require('os');

function initSocket(server) {
    logger.info("Setting up socket.io")
    io.listen(server); //setup socket.io
    io = require('socket.io')(server);
}

function watchSocket() {
    var limit = config.socket.limit,
        interval = config.socket.interval,
        all_d = []; // use all_d to hold config.limit number of data sets for initial connections
    (function schedule() {
        setTimeout(function() {
            var uptime_arr = os.loadavg();
            var ts = (new Date()).getTime();
            for (var i = 0, l = uptime_arr.length; i < l; i++) {
                uptime_arr[i] = Math.round(uptime_arr[i] * 100) / 100;
            }
            uptime_arr.unshift(ts);
            all_d.push(uptime_arr)
            if (all_d.length > limit) {
                all_d = all_d.slice(0 - limit);
            }
            io.sockets.emit('newdata', uptime_arr);
            schedule();
        }, interval * 1000);
    })();
    io.sockets.on('connection', function(socket) {
        socket.emit('init', { interval: interval, limit: limit });
        if (all_d.length > 0) {
            socket.emit('history', all_d);
        }
        socket.on('reqint', function(d) {
            if (!isNaN(d)) {
                interval = d;
                console.log('setting update interval to %d.', d);
            }
            socket.broadcast.emit('setint', d);
        });
    });
}

module.exports = {
	initSocket: initSocket,
	watchSocket: watchSocket
}
