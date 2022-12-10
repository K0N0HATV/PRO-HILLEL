const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const { path } = require('./gulp/const.js');
const babel = require("gulp-babel");

function cleanDist() {
    return src(path.dist, { read: false, allowEmpty: true, })
        .pipe(clean());
}

function copyJs() {
    return src(path.jsSrs)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dist));
}

function copyVendorJs() {
    return src(path.jquerySrc)
    .pipe(concat('vendor.min.js'))
    .pipe(dest(path.dist));
}

function copyCss() {
    return src(path.cssSrs)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('style.min.css'))
        .pipe(dest(path.dist));
}

function copyHtml() {
    return src(path.srcHtml).pipe(dest(path.dist));
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: path.dist
        }
    });

    watch(path.srcHtml, series(copyHtml, reloadBrowser));
    watch(path.watchJsSrc, series(copyJs, reloadBrowser));
    watch(path.cssSrs, series(copyCss, reloadBrowser));
    done();
}

function reloadBrowser(done) {
    browserSync.reload();
    done();
}

function taskBuild() {
    return series(
        cleanDist,
        parallel(
            copyJs,
            copyVendorJs,
            copyCss,
            copyHtml
        )
    );
}

exports.build = taskBuild();
exports.serve = series(taskBuild(), serve);