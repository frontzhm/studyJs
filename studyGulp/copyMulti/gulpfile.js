var gulp = require('gulp');
// 任务放在数组里
// gulp.task('default',['copy-html','copy-imgs','copy-other'],function () {
// console.log('搬运完成')
// })
// gulp.task('default',function () {
// 	// 命令必须处于运行模式
// 	 gulp.watch('app/index.html',['copy-html']);
// 	 gulp.watch('app/imgs/*.{jpg,png}',['copy-imgs']);
// 	 gulp.watch(['app/css/**','app/js/**','!app/js/tmp.js'],'copy-other');
// })
// gulp.task('copy-html',function(){
// 	return gulp.src('app/index.html')//指定源文件
// 			.pipe(gulp.dest('dist'))//拷贝到dist目录
// })
gulp.task('copy-imgs',function () {
	return gulp.src('app/imgs/*.{jpg,png}',{base:'app'})
			.pipe(gulp.dest('dist'))
})
// base默认是通配符前面的路径app/imgs/*.*的base是app/imgs,而dests输出的内容是替换base
// 于是输出dist/*.*,如果改变base的值 则替换改变后的base
gulp.task('copy-other',function () {
	  return gulp.src(['app/css/**','app/js/**','!app/js/tmp.js'],{base:'app'})
	  						.pipe(gulp.dest('dist'))
})


// scss
var sass = require("gulp-sass");
gulp.task("sass",function () {
	 return gulp.src('app/css/*.scss',{base:'app'})
	 						.pipe(sass())
	 						.pipe(gulp.dest('dist')) 
})
gulp.task('default',['sass'])

// connect
var connect = require('gulp-connect');
gulp.task('server',function(){
	// 默认8080
	connect.server({
		root:'dist',//服务器的根目录
		port:8001,//服务器的地址，没有此配置项默认也是 8080
		livereload:true//启用实时刷新的功能
	})
})
gulp.task('copy-html',function(){
	return gulp.src('app/index.html')//指定源文件
			.pipe(gulp.dest('dist'))//拷贝到dist目录
			.pipe(connect.reload())//通知浏览器重启
})
gulp.task('watch',function () {
	gulp.watch('app/index.html',['copy-html']);
	//当index.html文件变化时执行copy-html任务  
})
gulp.task('default',['server','watch'])



// concat
var concat = require('gulp-concat');
gulp.task('concat-js',function () {
	 return gulp.src(['app/js/*.js','!app/js/tmp.js'])//指定要合并的文件glob
	 						.pipe(concat('app.js'))//进行合并并指定合并后的文件名
	 						.pipe(gulp.dest('dist/js'))//输出到目标路径
})
gulp.task('default',['concat-js'])

// uglify
var uglify=require('gulp-uglify');
gulp.task('min-js',function () {
	 return gulp.src(['app/js/*.js','!app/js/tmp.js'])
	 			.pipe(concat('app.js'))//把多个JS文件合并成一个文件
	 			.pipe(uglify())//对合并后的app.js文件进行压缩
	 			.pipe(gulp.dest('dist/js'))//输出到目的地
})
gulp.task('default',['min-js'])

// minify-html
var minifyHtml = require('gulp-minify-html');
gulp.task('minify-html',function () {
	  return gulp.src('app/index.html')
	  		.pipe(minifyHtml())
	  		.pipe(gulp.dest('dist'))
})

// rename
var rename = require('gulp-rename');
gulp.task('uglify-js',function () {
	 return gulp.src(['app/js/*.js','!app/js/tmp.js'])//指定要处理的文件
	 						.pipe(concat('app.js'))//合并成一个文件
	 						// .pipe(gulp.dest('dist/js'))//保存此文件
	 						.pipe(uglify())//进行压缩
	 						.pipe(rename('app.min.js'))//对此文件进行重命名
	 						.pipe(gulp.dest('dist/js'))//再输出一次
})
gulp.task('default',['uglify-js'])


// minify-css
var minifyCss = require('gulp-minify-css');
gulp.task('minify-css',function () {
	 return gulp.src('app/css/*.scss')
	 						.pipe(sass())
	 						.pipe(concat('app.css'))
	 						.pipe(gulp.dest('dist/css'))
	 						.pipe(minifyCss())
	 						.pipe(rename('app.min.css'))
	 						.pipe(gulp.dest('dist/css'))
})
gulp.task('default',['minify-css'])


// 压缩图片
var imageMin = require('gulp-imagemin');
gulp.task('image-min',function () {
	 return gulp.src('app/imgs/*.*')
	 						.pipe(imageMin())
	 						.pipe(gulp.dest('dist/imgs/min'))
})
gulp.task('default',['image-min'])

// jshint
// var jshint = require('gulp-jshint');
// gulp.task('jshint',function () {
// 	 return gulp.src(['app/js/*.js','!app/js/tmp.js'])
// 	 						.pipe(concat('app.js'))
// 	 						.pipe(jshint())
// 	 						.pipe(jshint.reporter())
// 	 						.pipe(gulp.dest('dist/js'))
// })
// gulp.task('default',['jshint'])
// var gulp = require('gulp'),
//     jshint = require("gulp-jshint");
 
// gulp.task('jsLint', function () {
//     gulp.src('js/*.js')
//     .pipe(jshint()) //进行代码检查
//     .pipe(jshint.reporter()); // 输出检查结果
// });
// gulp.task('default',['jshint'])