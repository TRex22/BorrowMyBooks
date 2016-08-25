function catching(done, fn) {
  try {
    fn();
    done();
  } catch(err) {
    done(err);
  }
}

module.exports = catching;