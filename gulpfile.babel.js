'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
// import babel from 'gulp-babel';
import karma from 'gulp-karma-runner';
import webpack from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
// import sourcemaps from 'gulp-sourcemaps';

/* global __dirname:true */

gulp.task('default', ['build-dev']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['build-stupid'], () => {
  gulp.watch(['app/**/*'], ['build-stupid']);
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('test', ['build'], () => {
  gulp.src([
    'src/**/*.js',
    'test/**/*.js',
  ], {'read': false})
      .pipe(
          karma.server({
            'configFile': __dirname + '/karma.conf.js',
            'singleRun': true,
            'frameworks': ['mocha'],
            'browsers': ['ChromeVR'],
          })
      );
});

gulp.task('webpack:build', ['build-static', 'build-assets'], () => {
  gulp.src([
    'src/js/**/*.js',
  ]).pipe(webpack(webpackConfig, null, (err, stats) => {
    /* Use stats to do more things if needed */
  })).pipe(gulp.dest('dist/js/'));
});

gulp.task('build-static', () => {
  gulp.src([
    'src/index.html',
  ]).pipe(gulp.dest('dist/'));
});

gulp.task('build-assets', () => {
  gulp.src([
    'src/assets/**/*.*',
  ]).pipe(gulp.dest('dist/assets/'));
});

// modify some webpack config options
const myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
const devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', (callback) => {
  // run webpack
  devCompiler.run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', () => {
  const myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

    // keep the server alive or continue?
    // callback();
  });
});
