"use strict";

import gulp from "gulp";
// import concat from "gulp-concat";
// import rename from "gulp-rename";
import uglify from "gulp-uglify";
import gutil from "gulp-util";
import gulpif from "gulp-if";
// import addsrc from "gulp-add-src";
// import chalk from "chalk";
import mocha from "gulp-mocha";
// import del from "del";
import sourcemaps from "gulp-sourcemaps";

import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

import globby from "globby";
import browserify from "browserify";
import "babelify";

import browserSync from "browser-sync";
browserSync.create();
const reload = browserSync.reload;

/* global __dirname:true */

const dist = "./dist";
const production = false;

const libs = [
  "aframe",
  // "aframe-gltf",
  "aframe-physics-system",
  "aframe-teleport-controls",
  "aframe-text-component",
];

gulp.task("default", ["build"]);

gulp.task("build", ["html", "assets", "js", "libs"]);

gulp.task("watch", ["build"], () => {
  browserSync.init({
    server: dist,
    // proxy: "local.tool"
  });

  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/*.html", ["html"]);

  gulp.watch("dist/js/**/*.js").on("change", reload);
  gulp.watch("dist/*.html").on("change", reload);
});

gulp.task("js", () => {
  const options = {
    entries: globby.sync(["./src/js/index.js", "./src/**/*.js"]),
    debug: !production,
    paths: ["./node_modules", "./src/"]
  };

  const b = browserify(options);

  libs.forEach((lib) => {
    b.external(lib);
  });

  b.transform("babelify", {presets: ["es2015"]})
      .on("error", gutil.log)
      .bundle()
      .pipe(source("main.js"))
      .pipe(gulpif(!production, buffer()))
      .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(!production, uglify()))
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(gulp.dest(`${dist}/js`))
      .pipe(gutil.noop());
});

gulp.task("libs", () => {
  const options = {
    debug: !production,
  };

  const b = browserify(options);

  libs.forEach((lib) => {
    b.require(lib);
  });

  b.on("error", gutil.log)
      .bundle()
      .pipe(source("libs.js"))
      .pipe(buffer())
      .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
      .pipe(uglify())
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(gulp.dest(`${dist}/js`));
});

gulp.task("html", () => {
  gulp.src(["src/**/*.html"])
      .pipe(gulp.dest(dist));
});

gulp.task("assets", () => {
  gulp.src([
    "src/assets/**/*.*",
  ])
      .pipe(gulp.dest(`${dist}/assets/`));
});

gulp.task("test", ["js"], () => {
  gutil.log("running tests...");

  gulp.src([
    dist + "/js/**/*.js",
    dist + "/tests/**/*.js",
  ], {"read": false})
      .pipe(mocha());
});

gulp.task("watch-test", () => {
  gulp.watch(["src/**", "test/**"], ["test"]);
});
