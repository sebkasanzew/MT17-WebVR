// import path from 'path';
'use strict';

/* global module:true */

/**
 * Set some custom settings for Karma
 * @param {Object} config The configs for karma
 */
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['Chrome'],
    files: [
      'src/**/*.js',
      'test/*.js',
    ],
    exclude: [],

    // optionally, configure the reporter
    // text displays it within the console (alternative: text-summary)
    // lcov creates a codecov compatible report
    coverageReporter: {
      reporters: [
        {'type': 'text'},
        {'type': 'html', 'dir': 'coverage'},
        {'type': 'lcov'},
      ],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage is from karma-coverage and provides
    // Istanbul code coverage reports
    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests
    // whenever any file changes
    autoWatch: false,

    customLaunchers: {
      ChromeVR: {
        base: 'Chrome',
        // chromeDataDir: path.resolve('P:/Programme/Chrome-VR', 'chrome.exe'),
      },
    },
    singleRun: true,
  });
};
