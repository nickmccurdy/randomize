var gulp = require('gulp');
var csslint = require('gulp-csslint');
var docco = require('gulp-docco');
var jshint = require('gulp-jshint');

var paths = {
  scripts: 'js/*.js',
  styles: '*.css'
};

gulp.task('jshint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('csslint', function () {
  return gulp.src(paths.styles)
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('docco', function () {
  return gulp.src(paths.scripts)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('lint', ['jshint', 'csslint']);

gulp.task('default', ['lint']);
