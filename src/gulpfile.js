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

gulp.task('docs', function() {
    gulp.src(['**/*.js', 'README.md'], { base: '.' })
        .pipe(gulpDoxx({
            title: 'Borrow My Books',
            urlPrefix: '/docs'
        }))
        .pipe(gulp.dest('docs'));
});

gulp.task('pre-cover', function () { //'./*/**.js', 'app.js', '!test/', '!node_modules/', '!gulpfile.js' //['./**/*.js', '!test/', '!node_modules/', '!gulpfile.js']
  return gulp.src(['./*.js', 'routes/*.js', 'models/*.js', 'db/*.js', '!db/seedDb.js', 'logger/*.js']) //'app.js', 'bin/*', 'routes/*.js', 'models/*.js', 'db/*.js'
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('cover', ['pre-cover'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 70%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }));
});

gulp.task('test', ['lint', 'cover'], function() {
  console.log("All tests have completed.");
});

gulp.task('watch', gulpSync.async(['test']), function() {
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