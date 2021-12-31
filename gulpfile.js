/* eslint-disable unicorn/prefer-module,import/no-extraneous-dependencies,no-undef */
// noinspection ES6ConvertRequireIntoImport

const gulp = require('gulp');
const replace = require('gulp-replace');

async function replaceImport() {
  gulp.src(["./dist/index.js"], {
    allowEmpty: true
  })
    .pipe(replace(/(?<osm>from ["']openstamanager["'])/, "from '../../../index.js'"))
    .pipe(gulp.dest('./dist/'));
}

exports.default = replaceImport;
exports.watch = function () {
  gulp.watch('./dist/index.js', replaceImport);
}
