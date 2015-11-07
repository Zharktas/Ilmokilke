var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function(){
    return gulp.src('./public/stylesheets/style.less')
        .pipe(less())
        .pipe(autoprefixer(({
            browsers: "last 2 versions"
        })))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('default', ['less']);