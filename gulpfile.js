/*global require*/
(function (require) {
  "use strict";
  var g = require("gulp");
  var karma = require("gulp-karma-runner");

  g.task("test", function () {
    g.src([
      "src/**/*.js",
      "test/**/*.js"
    ], {"read": false}).pipe(
        karma.server({
          "configFile": __dirname + '/karma.conf.js',
          "singleRun": true,
          "frameworks": ["mocha"],
          "browsers": ["ChromeVR"]
        })
    );
  });

  g.task('default', ['test']);
}(require));
