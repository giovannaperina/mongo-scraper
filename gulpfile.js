var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('./public/assets/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('./public/assets/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

