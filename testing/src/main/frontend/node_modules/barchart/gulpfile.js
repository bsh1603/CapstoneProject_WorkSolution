var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');
var connect = require('connect');
var http = require('http');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');

var port = gutil.env.port || 8000;

gulp.task('dev', ['clean', 'lint', 'static-files', 'build', 'less', 'watch'], function(done) {
  var app = connect();
  app.use(connect.static('build'));

  var server = http.createServer(app);
  server.listen(port);

  server.on('listening', function() {
    gutil.log('http server listening on port ' + port);
    done();
  });

  server.on('error', function(err) {
    done(err);
  });
});

gulp.task('clean', function() {
  return gulp.src('build/**/*', {read: false})
    .pipe(clean());
});

gulp.task('lint', ['clean'], function() {
  return gulp.src('index.js')
    .pipe(jshint({
      node: true,
      browser: true,
      undef: true,
      unused: 'vars',
      curly: true,
      freeze: true,
      latedef: true,
      noarg: true,
      trailing: true,
      nonew: true,
      newcap: false,
      nonbsp: true,
      maxdepth: 5,
      maxcomplexity: 10,
      predef: ["alert", "confirm", "prompt", "Q", "_", "d3", "define"]
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('static-files', ['clean'], function() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('build'));
});

var staticFile = function(evnt) {
  gutil.log('copying ' + evnt.path);
  return gulp.src(evnt.path)
    .pipe(gulp.dest('build'));
};

gulp.task('watch', ['build'], function() {
  gulp.watch(['index.js', 'js/**/*.js'], ['build-dev']);
  gulp.watch('css/**/*.less', ['less-dev']);
  gulp.watch('static/**/*', staticFile);
});

var build = function() {
  return browserify({entries: ['./js/main.js'], baseDir: '.'})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('build/js'));
};

gulp.task('build', ['clean'], build);
gulp.task('build-dev', build);

var lessBuild = function() {
  return gulp.src('css/**/*.less')
    .pipe(concat('main.css'))
    .pipe(less())
    .pipe(gulp.dest('build/css'));
};

gulp.task('less', ['clean'], lessBuild);
gulp.task('less-dev', lessBuild);

gulp.task('default', ['dev']);
