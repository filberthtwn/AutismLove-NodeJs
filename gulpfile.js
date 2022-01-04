const gulp = require('gulp'), 
      sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./public/styles/index.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./**/*.scss', ['sass'])
})

gulp.task('default', ['sass'])