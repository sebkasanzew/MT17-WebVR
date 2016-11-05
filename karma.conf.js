// import path from 'path';

/* global module:true */

/**
 * Set some custom settings for Karma
 * @param {Object} config The configs for karma
 */
module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'ChromeVR'],
    customLaunchers: {
      ChromeVR: {
        base: 'Chrome',
        // chromeDataDir: path.resolve('P:/Programme/Chrome-VR', 'chrome.exe'),
      },
    },
  });
};
