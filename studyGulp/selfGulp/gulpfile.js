var gulp = require('gulp');
gulp.task('default',function(){
	return gulp.src('app/app.html')
			.pipe(gulp.dest('www/build'))
})