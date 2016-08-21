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
var gulpDoxx = require('gulp-doxx');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
    return gulp.src(jsPath)
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'))
        .pipe(jsHint.reporter('fail'));
});

gulp.task('watch', gulpSync.async(['lint']), function() {
    nodemon({
            script: config.startPath
        })
        .on('restart', function() {
            console.log('========================================');
        });

    lr.listen(config.liveReloadPort);

    gulp.watch('server/**/*', function() {
        var fileName = require('path').relative(config.port, event.path);
        lr.changed({
            body: {
                files: [fileName]
            }
        });
    });
});

gulp.task('docs', function() {
    gulp.src(['**/*.js', 'README.md'], { base: '.' })
        .pipe(gulpDoxx({
            title: 'Borrow My Books',
            urlPrefix: '/docs'
        }))
        .pipe(gulp.dest('docs'));
});

gulp.task('pre-test', function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});
