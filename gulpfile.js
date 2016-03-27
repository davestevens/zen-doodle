"use strict";

let gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    browserify = require("gulp-browserify"),
    autoprefixer = require("gulp-autoprefixer"),
    livereload = require("gulp-livereload"),
    del = require("del"),
    Config = require("./gulp-config.json"),
    config = Config.development;

gulp.task("styles", () => {
  return gulp
    .src("assets/styles/[^_]*.scss")
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: true
    }))
    .pipe(
      sass(config.sass).on("error", gutil.log)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("scripts", () => {
  return gulp
    .src("assets/scripts/zen-doodle.js")
    .pipe(
      browserify(config.browserify).on("error", gutil.log)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("copy", () => {
  return gulp
    .src("assets/**/*.!(js|scss)")
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("clean", () => {
  return del([
    config.directory + "/*",
    "!" + config.directory + "/.keep"
  ]);
});

gulp.task("development", () => { config = Config.development; });
gulp.task("production", () => { config = Config.production; });

gulp.task("watch-all", () => {
  livereload.listen();
  gulp.watch("assets/scripts/**/*", ["scripts"]);
  gulp.watch("assets/styles/**/*", ["styles"]);
  gulp.watch("assets/**/*.!(js|scss)", ["copy"]);
});

gulp.task("build", [
  "clean",
  "styles",
  "scripts",
  "copy"
]);

gulp.task("build-prod", ["production", "build"]);
gulp.task("watch", ["build", "watch-all"]);
gulp.task("default", ["build"]);
