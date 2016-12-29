var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var ngAnnotate = require('gulp-ng-annotate');
var coffee = require('gulp-coffee');
var pug = require('gulp-pug');
var nodemon = require('gulp-nodemon');

var src  = './src'
var dest = './dest'
//var dist = './dist'

gulp.task('coffee', function() {
  var stream = gulp.src(src + '/**/*.coffee')
    //.pipe(changed(dest, {extension: '.js'}))
    //.pipe(ngAnnotate())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(dest));
  return stream
});

gulp.task('pug', function() {
  var stream = gulp.src(src + '/**/*.pug')
    //.pipe(changed(dest, {extension: '.html'}))
    //.pipe(ngAnnotate())
    .pipe(pug({}))
    .pipe(gulp.dest(dest));
  return stream
});

gulp.task('compile', ['pug', 'coffee']);

gulp.task('default', ['coffee','pug','js'], function() {
  var stream = nodemon({
    script: './dest/server/server.js'
    ,watch: 'src'
    ,tasks: ['coffee', 'pug','js']
  })
  return stream
});

gulp.task('js', function () {

  return gulp.src('dest/**/*.js', {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(sourcemaps.init({loadMaps: true}))

    .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('dist'));

});