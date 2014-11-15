var gulp = require('gulp'),
  bower = require ('main-bower-files'),
  gulpFilter = require('gulp-filter'),
  del = require('del');

gulp.task('bower', ['cleanup-vendor'], function () {
  var jsFilter = gulpFilter('**/*.js');
  var cssFilter = gulpFilter('**/*.css');

  return gulp.src(bower())
    .pipe(jsFilter)
    .pipe(gulp.dest('vendor/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(gulp.dest('vendor/css'))
});

gulp.task('cleanup-vendor', function () {
  del.sync('vendor/js');
  del.sync('vendor/css');
});
