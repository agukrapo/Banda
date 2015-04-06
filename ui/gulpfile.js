var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var config = {
    dist: './dist'
}


gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(config.dist + '/css'));
});