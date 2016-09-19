var
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  del = require('del'),
  runSequece = require('run-sequece'),
  sass = require("gulp-sass"),
  concat = require('gulp-concat'),
  imagemin = require("gulp-imagemin"),
  minifyCss = require("gulp-minify-css"),
  minifyHtml = require("gulp-minify-html"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");



gulp.task("compile-sass", function() {
  gulp.src(['app/test/d.scss', 'app/test/b.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'))
});
// 为了简化watch-css的任务
// gulp.task("css-minify", function() {
//   gulp.src('app/**/*.css')
//     .pipe(minifyCss())
//     .pipe(rename({
//       extname: ".min.css"
//     }))
//     .pipe(gulp.dest('www/build/css'))
// });
// gulp.task('watch-css', function() {
//   gulp.watch('app/**/*.css',['css-minify'])
// });

// 上面的代码,可以在引入watch插件后变成这样
// 缺点是:在进程中不显示改变
// watch
gulp.task('watch-css',function () {
	 watch('app/**/*.css')
	 .pipe(rename({
	   extname: ".min.css"
	 }))
	 .pipe(gulp.dest('www/build'))
})
// del (可以删除文件夹和文件  temp   和 temp/** 不太一样的 当筛选里面不想删除的文件时)
gulp.task('del-tempjs',function (){
	  del(['app/js/temp/*.js','!app/js/temp/b.js'],function(){
	  	console.log('finished')
	  })
})
// run-sequece
