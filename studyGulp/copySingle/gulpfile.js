var gulp = require('gulp');
gulp.task('copy-html',function () {
	 return gulp.src('index.html')
	 						.pipe(gulp.dest('dist')) 
})