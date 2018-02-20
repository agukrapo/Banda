var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var shell = require('gulp-shell')
var uglify = require('gulp-uglify');

var config = {
    jsSrc: './js',
    jsDist: './dist/js',
    cssDist: './dist/css',
    jsStaticDest: '../backend/paginabanda/static/js',
    cssStaticDest: '../backend/paginabanda/static/css',
}

gulp.task('clean', function (callBack) {
  del([
    config.cssDist + '/*',
    config.jsDist + '/*',
    config.cssStaticDest + '/*',
    config.jsStaticDest + '/*'
  ], {force: true} , callBack);
});

/*gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDist));
});*/

gulp.task('sass', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDist))
    .pipe(cleanCss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(config.cssStaticDest));
});

gulp.task('requirejs', shell.task(['r.js -o require.build.js']));

gulp.task('copyjs', ['requirejs'], function() {
  gulp.src(config.jsDist + '/banda.js')
    .pipe(gulp.dest(config.jsStaticDest));
  
  gulp.src(config.jsDist + '/entrypoint.js')
    .pipe(gulp.dest(config.jsStaticDest));
  
  gulp.src(config.jsDist + '/views/*')
    .pipe(gulp.dest(config.jsStaticDest + '/views'));
  
  gulp.src(config.jsSrc + '/lib/magnific-popup-1.0.0.js')
    .pipe(uglify())
    .pipe(rename('magnific-popup.min.js'))
    .pipe(gulp.dest(config.jsStaticDest + '/lib'));
  
  gulp.src(config.jsSrc + '/lib/echo-1.7.0.js')
    .pipe(uglify())
    .pipe(rename('echo.min.js'))
    .pipe(gulp.dest(config.jsStaticDest + '/lib'));
  
});

gulp.task('css', ['clean', 'sass']);
gulp.task('js', ['clean', 'requirejs', 'copyjs']);
gulp.task('default', ['clean', 'sass', 'js']);