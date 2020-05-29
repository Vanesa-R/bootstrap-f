const gulp = require("gulp");
const del = require("del");
const htmlmin = require("gulp-htmlmin")
const sass = require("gulp-dart-sass");
const autoprefixer = require ("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const sassdoc = require("sassdoc");
const imagemin = require("gulp-imagemin");

gulp.task("html", function(){
    return gulp.src("./index.html")
    .pipe(htmlmin({
        collapseWhitespace: true 
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function(){
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("images", () =>
    gulp.src("app/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
);

gulp.task("docs", function () {
    var options = {
      dest: "dist/docs",
      verbose: true,
    };
    return gulp.src("app/scss/**/*.scss")
      .pipe(sassdoc(options));
  });

gulp.task("clean", function(){
    return del("dist/css/*.css");
});

gulp.task("package", 
    gulp.series("clean", 
    gulp.parallel("css", "docs"), 
    "html", "images"));