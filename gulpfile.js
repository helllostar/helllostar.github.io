var gulp    =  require('gulp'),
    concat  =  require('gulp-concat'),
    connect =  require('gulp-connect'),
    cssmin  =  require('gulp-cssmin'),
    header  =  require('gulp-header'),
    open    =  require('gulp-open'),
    plumber =  require('gulp-plumber'),
    rename  =  require('gulp-rename'),
    sass    =  require('gulp-ruby-sass'),
    uglify  =  require('gulp-uglify'),

    // gutil   =  require('gulp-util'),
    // prefixer=  require('gulp-autoprefixer'),
    // cp      =  require('child_process'),
    // lr      =  require('tiny-lr'),
    // server  =  lr(),
    shell   =  require('gulp-shell');

var pkg = require('./package.json');
var banner = ['/**',
              ' * Helllo Star v<%= pkg.version %> (<%= pkg.homepage %>)',
              ' * Copyright 2015-<%= new Date().getFullYear() %> <%= pkg.author %>',
              ' * Licensed under the <%= pkg.license %> license',
                ' */',
                ''].join('\n');

// Concat and Uglify
var plugins  = ['bower_components/jquery/dist/jquery.min.js',
               'bower_components/bootstrap/dist/js/bootstrap.min.js',
               'bower_components/bootstrap-validator/dist/validator.min.js',
               'bower_components/headroom.js/dist/headroom.min.js',
               'bower_components/autosize/dist/autosize.min.js'];

var helpers  = ['_js/script.js',
                '_js/textarea-count.js',
                '_js/pilpil.jekyll.js',
                '_js/pilpil.js'];

var watchman = ['*.html',
                '_includes/*',
                '_layouts/*',
                'stars/_posts/**/*'];

gulp.task('js', function(){
  gulp.src(plugins)
      .pipe(plumber())
      .pipe(concat('plugins.js'))
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
  gulp.src(helpers)
      .pipe(plumber())
      .pipe(concat('helllostar.js'))
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
});

// sass
gulp.task('sass', function(){
  return sass('_sass/helllostar.scss')
      //.on('error', sass.logError)
      .pipe(plumber())
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('dist/css'))
      .pipe(cssmin())
  		.pipe(rename({suffix: '.min'}))
      .pipe(header(banner, { pkg : pkg } ))
  		.pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
});

gulp.task('jekyll-build', shell.task(['jekyll build']));

gulp.task('jekyll', ['jekyll-build'], function () {
  gulp.src(watchman)
    .pipe(connect.reload());
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: '_site',
    port: 8080,
    livereload: true
  });
});

// Open target file with default application
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:8080/',
    //app: 'firefox'
  };
  gulp.src('./_site')
  .pipe(open(options));
});


// Watch
gulp.task('watch', function(){
  gulp.watch('_js/*.js', ['js']);
  gulp.watch('_sass/**/*.scss', ['sass']);
  // gulp.watch(['**/*.html'], ['html']);
  gulp.watch(watchman, ['jekyll']);
});

gulp.task('dist', ['js', 'sass']);
gulp.task('build', ['jekyll-build']);
gulp.task('serve', ['connect', 'open', 'watch']);
gulp.task('default', ['js', 'sass', 'connect', 'open', 'watch']);
