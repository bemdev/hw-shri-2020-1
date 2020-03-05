const { src, dest, parallel, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

function css() {
    return src(['src/**/*.css', 'src/*.css'])
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(dest('pages/build'))
}

async function build() {
    parallel(css)();
};

async function watcher () {
    return watch(['src/**/*.css', 'src/*.css'], parallel(css));
}

exports.css = css;
exports.build = build;
exports.watcher = watcher;