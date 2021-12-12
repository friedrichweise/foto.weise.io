const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('autoprefixer');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require('browser-sync');

const input = './scss/*.scss';
const output = './styles';


function css() {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(postcss([cssnano(), autoprefixer({ overrideBrowserslist: ['> 1%', 'last 8 versions', 'Firefox >= 20', 'ie >= 9'] })]))
        .pipe(gulp.dest(output))
}


function init(done) {
    browserSync.init(['styles/*.css', 'index.html', 'index.de.html'], {
        open: false,
        server: {
            baseDir: './'
        }
    });
    done();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}


function watchTask() {
    console.log("Run watch")
    gulp.watch(input, gulp.series(css, browsersyncReload));
    gulp.watch('*.html', browsersyncReload);
}

exports.default = gulp.series(
    init,
    css,
    watchTask,
);
