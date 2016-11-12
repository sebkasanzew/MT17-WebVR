'use strict';

import gulp from 'gulp';
import karma from 'gulp-karma-runner';
import webpack from 'webpack-stream';
// import sourcemaps from 'gulp-sourcemaps';

/* global __dirname:true */
gulp.task('test', () => {
  gulp.src([
    'src/**/*.js',
    'test/**/*.js',
  ], {'read': false})
      .pipe(webpack({
        /* config */
      }, null, (err, stats) => {
        /* Use stats to do more things if needed */
      }))
      .pipe(
          karma.server({
            'configFile': __dirname + '/karma.conf.js',
            'singleRun': true,
            'frameworks': ['mocha'],
            'browsers': ['ChromeVR'],
          })
      );
});

gulp.task('build', () => {

});

gulp.task('default', ['test']);
