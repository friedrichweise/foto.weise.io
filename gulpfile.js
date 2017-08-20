var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var notify = require("gulp-notify")
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var input = 'scss/styles.scss';
var output = './styles/';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass())
    .on('error', function (err) {
        notify.onError({
            title: 'Error',
            message: '<%= error.message %>',
        })(err);
        this.emit('end');
    })
    .pipe(prefix("last 8 versions", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest(output))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssmin())
    .pipe(gulp.dest(output))
    .pipe(reload({stream:true}));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['styles/*.css', 'js/*.js'], {
        server: {
            baseDir: './'
        }
    });
});


gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
});

gulp.task('default', ['sass', 'watch', 'browser-sync']);