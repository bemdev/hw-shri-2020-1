const { src, dest, parallel, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

function css() {
    return src(['common.blocks/**/*.css', 'common.blocks/*.css'])
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(dest('build'))
}

async function build() {
    parallel(css)();
};

async function watcher () {
    return watch(['common.blocks/**/*.css', 'common.blocks/*.css'], parallel(css));
}

exports.css = css;
exports.build = build;
exports.watcher = watcher;