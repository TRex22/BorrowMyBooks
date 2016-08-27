//https://davidwalsh.name/async-generators
//TODO Error handling
// run (async) a generator to completion
// Note: simplified approach: no error handling here
function runGenerator(g) {
    var it = g(),
        ret;

    // asynchronously iterate over generator
    (function iterate(val) {
        ret = it.next(val);

        if (!ret.done) {
            // poor man's "is it a promise?" test
            if ("then" in ret.value) {
                // wait on the promise
                ret.value.then(iterate);
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout(function() {
                    iterate(ret.value);
                }, 0);
            }
        }
    })
};

module.exports = runGenerator;
