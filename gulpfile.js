// Initialize plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload')
    ;

// Compile SASS
gulp.task('countdown-sass', function() {
  return gulp.src('src/scss/countdown.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
      }))
    .pipe(rename({
      extname:'.min.css'}
      ))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload())
    ;
});
gulp.watch('src/scss/countdown.scss', ['countdown-sass']);

// Minify JS
gulp.task('countdown-js', function() {
  return gulp.src('src/js/countdown.js')
    .pipe(uglify())
    .pipe(rename({
      extname:'.min.js'}
      ))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload())
    ;
});
gulp.watch('src/js/countdown.js', ['countdown-js']);

// LiveReload page when modifying index.html
gulp.task('countdown-reload', function() {
  livereload.changed();
});
gulp.watch('dist/index.html', ['countdown-reload']);

// Do all the above by default
gulp.task('default', ['countdown-sass','countdown-js']);
