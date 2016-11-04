var path = require("path");

module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'ChromeVR'],
    customLaunchers: {
      ChromeVR: {
        base: 'Chrome',
        //chromeDataDir: path.resolve('P:/Programme/Chrome-VR', "chrome.exe")
      }
    }
  });
};
