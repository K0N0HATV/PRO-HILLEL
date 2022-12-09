const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

function cleanDist() {
    return src("./dist", { read: false, allowEmpty: true, })
        .pipe(clean());
}

function copyJs() {
    return src([
        './src/js/Api/galleryApi.js',
        './src/js/main.js'
    ])
        .pipe(concat('app.js'))
        .pipe(dest('dist'));
}

function copyCss() {
    return src('./src/css/*.css')
        .pipe(concat('app.css'))
        .pipe(dest('dist'));
}

function copyHtml() {
    return src('./src/index.html').pipe(dest('dist'));
}

exports.default = series(cleanDist, parallel(copyJs, copyCss, copyHtml));