'use strict';
var gulp = require("gulp");
var jsHint = require('gulp-jshint');
var fs = require('fs');
var npmPackage = require("./package.json");
var jsPath = ['./src/*.js'];
var config = require('./config.json');
var nodemon = require('gulp-nodemon');
var server = require('gulp-express');
var lr = require('tiny-lr')();
var gulpSync = require('gulp-sync')(gulp);

gulp.task('lint', function () {
    return gulp.src(jsPath)
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'))
        .pipe(jsHint.reporter('fail'));
});

gulp.task('watch', gulpSync.async(['lint']), function () {
    nodemon({
      script: config.startPath
    })
    .on('restart', function () {
        console.log('========================================');
    });

    lr.listen(config.liveReloadPort);

    gulp.watch('server/**/*', function(){
      var fileName = require('path').relative(config.port, event.path);
      lr.changed({
        body: {
          files: [fileName]
        }
      });
    });
});