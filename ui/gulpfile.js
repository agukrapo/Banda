var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');

var rjs = require('gulp-requirejs');
var rjsConfig = require('./require.build.json');

var config = {
    dist: './dist',
    staticDest: '../paginabanda/static'
}

gulp.task('clean', function (callBack) {
  del([
    config.dist + '/css/*',
//    config.dist + '/js/*',
    config.staticDest + '/css/*',
//    config.staticDest + '/js/*'
  ], {force: true} , callBack);
});

gulp.task('css', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest(config.dist + '/css'))
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(config.staticDest + '/css'));
});

gulp.task('requirejs', function() {
  rjs(rjsConfig);

});




gulp.task('default', ['clean', 'css']);