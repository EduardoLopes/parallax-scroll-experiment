const gulp = require('gulp');
const del = require('del');
const budo = require('budo');
const babelify = require('babelify');
const errorify = require('errorify');
const garnish = require('garnish');
const rename = require("gulp-rename");
const ghPages = require('gulp-gh-pages');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function () {
  var b = browserify({
    entries: './app/js/main.js',
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

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
    'js/vendor/*',
    ], { cwd: 'app' })
    .pipe(gulp.dest("./dist/js/vendor"));

});

gulp.task('default', ['javascript', 'copy'])
