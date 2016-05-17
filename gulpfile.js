const gulp = require('gulp');
const eslint = require('gulp-eslint');

var apiFiles = ['./*.js', './lib/*.js', './models/*.js', './routes/*.js'];

gulp.task('lint:api', () => {
  return gulp.src(apiFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('default', ['lint:api']);
