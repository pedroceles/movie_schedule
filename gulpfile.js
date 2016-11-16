var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var pump = require('pump');
 
gulp.task('uglify-bower', function(){
  var jsFilter = filter(['**/*.js', '**/*.js.min']);
  var cssFilter = filter(['**/*.css', '**/*.css.min']);
  var bowerFiles = mainBowerFiles({
    overrides: {
      'themoviedb-javascript-library': {
        main: ['themoviedb.min.js'],
      }
    }
  });
  var jsArray = [
    gulp.src('./bower.json'), bowerFiles, jsFilter,
    concat('all.min.js'), uglify(), gulp.dest('dist')
  ];
  var cssArray = [
    gulp.src('./bower.json'), mainBowerFiles(), cssFilter,
    concat('all.min.css'), uglifycss(), gulp.dest('dist')
  ];
  var p1 = pump(jsArray);
  var p2 = pump(cssArray);
  return p1 && p2;
});

gulp.task('concat-source', function () {
  return pump([
    gulp.src('./client/**/*.js'),
    concat('src.js'),
    gulp.dest('dist')
  ]);
});

gulp.task('go', function () {
  return gulp.start('uglify-bower') &&
    gulp.start('concat-source');
});

gulp.task('serve', function () {
  gulp.src('./')
    .pipe(webserver({
      port: 9001,
      fallback: '/client/index.html'
    }));
});
