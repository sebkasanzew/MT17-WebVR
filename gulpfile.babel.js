'use strict';

import gulp from 'gulp';
import karma from 'gulp-karma-runner';
// import sourcemaps from 'gulp-sourcemaps';

/* global __dirname:true */
gulp.task('test', function() {
  gulp.src([
    'src/**/*.js',
    'test/**/*.js',
  ], {'read': false}).pipe(
      karma.server({
        'configFile': __dirname + '/karma.conf.js',
        'singleRun': true,
        'frameworks': ['mocha'],
        'browsers': ['ChromeVR'],
      })
  );
});

gulp.task('default', ['test']);
