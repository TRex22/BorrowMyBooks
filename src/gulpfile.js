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
var install = require("gulp-install");

/*var clear = require('./db/clearDb');
var seed = require('./db/seedDb');*/

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

gulp.task('pre-cover', function() {
    process.env.NODE_ENV = 'test';
    return gulp.src(['./*.js', 'routes/*.js', 'models/*.js', 'db/*.js', '!db/seedDb.js', 'logger/*.js', 'public/javascripts/*.js', 'services/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('cover', ['pre-cover'], function() {
    return gulp.src(['test/**/*.js'])
        .pipe(mocha({
            recursive: true,
            reporter: 'spec',
            ui: 'bdd'
        }))
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 70%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }));
});

gulp.task('test', ['install', 'lint', 'cover'], function() {
    console.log("All tests have completed.");
    process.exit();
});

gulp.task('install', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

gulp.task('watch', gulpSync.async(['lint', 'cover']), function() {
    process.env.NODE_ENV = 'development';
    nodemon({
            script: config.startPath
        })
        .on('restart', function() {
            console.log('========================================');
        });

    lr.listen(config.liveReloadPort);

    gulp.watch('server/**/*', ['lint'], function() {
        var fileName = require('path').relative(config.port, event.path);
        lr.changed({
            body: {
                files: [fileName]
            }
        });
    });
});

gulp.task('watch-man', gulpSync.async(['lint']), function() {
    process.env.NODE_ENV = 'development';
    nodemon({
            script: config.startPath
        })
        .on('restart', function() {
            console.log('========================================');
        });

    lr.listen(config.liveReloadPort);

    gulp.watch('server/**/*', ['lint'], function() {
        var fileName = require('path').relative(config.port, event.path);
        lr.changed({
            body: {
                files: [fileName]
            }
        });
    });
});

/*gulp.task('reset-db', gulpSync.sync(['clear-db', 'seed-db']));

gulp.task('clear-db', function() {
    clear.go();
});

gulp.task('seed-db', function() {
    seed.go();
});*/

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});
