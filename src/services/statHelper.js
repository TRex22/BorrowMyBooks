const os = require('os');
/*var logger = require("../logger/logger");*/
var simpleInfo = require('simple-node-info');

/* istanbul ignore next */
function vmstat() {
    var isWin = (os.platform() === 'win32' || os.platform() === 'win64');
    if (isWin) {
        /*logger.error("Error! On Windows platform. VM Stats are not possible!");*/
        console.log("" + winvmstat());
    } else {
        const exec = require('child_process').exec;
        exec('vmstat -n 1', (error, stdout, stderr) => {
            if (error) {
                console.err(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
}

/* istanbul ignore next */
function winvmstat() {
    //this is a work in progress
    //for now basic info and much zeroing

    /*var cpu = require('windows-cpu');*/

    var info = simpleInfo.getStat();

    var output = "procs -----------memory---------- ---swap-- -----io---- -system-- ----cpu----\n" +
        "r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa";

    var r = "0"; //TODO
    var b = "0"; //todo

    var swpd = "0"; //todo
    var free = "2742600"; //todo + info.freeMemory;
    var buff = "0"; //todo
    var cache = "0"; //todo

    var si = "0"; //todo
    var so = "0"; //todo

    var bi = "0"; //todo
    var bo = "0"; //todo

    var _in = "0"; //todo
    var cs = "0"; //todo

    var us = "0"; //todo
    var sy = "0"; //todo
    var id = "0"; //todo
    var wa = "0"; //todo

    output += r + " " + b + " " + swpd + " " + free + " " + buff + " " + cache + " " + si + " " + so + " " + bi + " " + bo + " " + _in + " " + cs + " " + us + " " + sy + " " + id + " " + wa;
    //Note: the memory, swap, and I/O statistics are in blocks, not in bytes. In Linux, blocks are usually 1,024 bytes (1 KB).
    return output;
}

/*function isOSWin64() {
    return process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
}

function isOSWin32() {
    return process.arch === 'x86' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
}*/

module.exports = {
    vmstat: vmstat
}
