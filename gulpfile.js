var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	filter = require('gulp-filter'),
	filterCSS = filter('**/*.css');

// Styles
gulp.task('styles', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(gulp.dest('dist/css'))
		//.pipe(filterCSS)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		//.pipe(filterCSS.restore())
		
		.pipe(notify({ message: 'Styles task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src('src/images/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

// Admin Scripts
gulp.task('scripts', function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/modernizr/modernizr.js',
			'src/js/main.js'])
		.pipe(gulp.dest('dist/js'));
});

// Clean up
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/images'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

// Watch files
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('src/scss/**/*.scss', ['styles']);

	// Watch image files
	gulp.watch('src/images/**/*', ['images']);

	// Create LiveReload server
	livereload.listen();

	// Watch output files, reload on change
	gulp.watch(['dist/css/**','dist/js/**','**/*.php']).on('change', livereload.changed);

});