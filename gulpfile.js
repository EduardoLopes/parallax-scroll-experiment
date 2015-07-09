const gulp = require('gulp');
const babel = require("gulp-babel");
const del = require('del');
const budo = require('budo');
const babelify = require('babelify');
const errorify = require('errorify');
const garnish = require('garnish');
const rename = require("gulp-rename");
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['default'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('del', function(cb){

  del([
    'dist/**/*'
  ], cb);

});

//start our local development server
gulp.task('budo', function(cb) {

  const pretty = garnish();
  pretty.pipe(process.stdout);

  budo('app/js/main.js', {
    serve: 'bundle.js',
    stream: pretty,        //pretty-print requests
    live: true,            //live reload & CSS injection
    verbose: true,         //verbose watchify logging
    dir: 'app',            //directory to serve
    transform: babelify,   //browserify transforms
    plugin: errorify       //display errors in browser
  })
    .on('connect', function(ev) {

      console.log("Server started at "+ev.uri)

    })
    .on('exit', cb);

});

gulp.task('copy', ['del', 'copy-vendor'], function() {

  return gulp.src([
    'index.html',
    'style.css',
    ], { cwd: 'app' })
    .pipe(gulp.dest("dist"));

});

gulp.task('copy-vendor', ['del'], function() {

  return gulp.src([
    'app/js/vendor/*',
    ], { cwd: 'app' })
    .pipe(gulp.dest("dist/js/vendor"));

});

gulp.task("babel", ['del'],function () {

  return gulp.src("app/js/main.js")
    .pipe(babel())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task('default', ['babel', 'copy'])
