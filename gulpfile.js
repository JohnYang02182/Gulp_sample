// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const gulpPlumber = require('gulp-plumber');
// var BalanceHTableColumnTitle = [{
//   check: "",
//   time: "거래 시간",
//   ID: "거래 ID",
//   type: "거래 유형",
//   money: "최종 균형",
//   memo: "메모",
//   delete: "삭제"
// },]
var styleLink = {
    sassLink: 'src/scss/**/*.+(scss|sass)',
    outputLink: './dist/css/'
}
var browserSyncLink = {
    root: './dist/bHistory.html',
    watchIndex: './dist/*.html',
    watchHtml: ['./main_page/**/*.html','./main_page/*.html'],
    watchJS: 'main_page/*.js'
}
// import html
function importHtmlTask() {
  return gulp.src(['./main_page/*.html'])
        .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file',
          context: {
            balanceH: 'balanceH',
            betH: 'betH'
          }
        }))
        .pipe(gulp.dest('./dist/'));
}

// notify
function showErrorNotify(error) {
  var args = Array.prototype.slice.call(arguments);
  // Show notification
  notify.logLevel(0);
  notify
    .onError({
      title: '[' + error.relativePath + '] Error',
      message: '<%= error.messageOriginal %>',
      sound: 'Pop'
    })
    .apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

// sass task
function sassTask() {
  return gulp.src(styleLink.sassLink)
        .pipe(
          plumber({
            errorHandler: showErrorNotify
          })
        )
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss(autoprefixer()))
        .pipe(gulp.dest(styleLink.outputLink));
}

function jsTask() {
	return gulp.src(
		[
			browserSyncLink.watchJS,
			//,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
		],
		{ sourcemaps: true }
	)
		.pipe(terser())
		.pipe(gulp.dest('../js', { sourcemaps: '.' }));
}

function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: browserSyncLink.root
  })
  cb();
}

function browserSyncLoad(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  gulp.watch(browserSyncLink.watchHtml, gulp.series(importHtmlTask));
  gulp.watch(browserSyncLink.watchIndex, gulp.series(browserSyncLoad));
  gulp.watch(['src/**/*.+(scss|sass)', '../js/*.js'], gulp.series(gulp.parallel(sassTask, jsTask), browserSyncLoad));
}

exports.importHtmlTask = importHtmlTask;
exports.default = gulp.series(gulp.parallel(sassTask, jsTask, importHtmlTask), browserSyncServer, watchTask);
