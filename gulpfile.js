//gulpfile.js
const gulp = require("gulp"),
  minifyCSS = require("gulp-clean-css"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass")(require('sass')),
  npmDist = require("gulp-npm-dist");

const sassFiles = "scss/*.scss",
  cssDest = "dist/css/";

//compile scss into css
function style() {
  return gulp
    .src(sassFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
}

//This is for the minify css
async function minifycss() {
  return gulp
    .src(["dist/css/*.css", "!dist/css/**/*.min.css"])
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDest));
}

// This is for the minifyjs
async function minifyjs() {
  return gulp
    .src([
      "dist/js/theme.js",
      "dist/js/hostpro.js",
      "!dist/js/theme.min.js",
      "!dist/js/hostpro.min.js",
    ])
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
}

async function watch() {
  gulp.watch(["scss/**/*.scss"], style);
  gulp.watch(["dist/css/style.css"], minifycss);
  gulp.watch(["dist/js/**/*.js", "!dist/js/**/*.min.js"], minifyjs);
}

gulp.task("default", watch);

exports.style = style;
exports.minifycss = minifycss;
exports.minifyjs = minifyjs;
exports.watch = watch;
