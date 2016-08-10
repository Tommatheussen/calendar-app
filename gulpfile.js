var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglifyCSS = require('gulp-uglifycss');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var revDelete = require('gulp-rev-delete-original');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var del = require('del');
var git = require('gulp-git');

gulp.task('clean', function () {
    return del.sync([
        'dist'
    ]);
});

gulp.task('build-css', ['clean'], function () {
    return gulp.src('./app/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-template-cache', function () {
    return gulp.src([
		'./app/**/*.html',
		'!./app/index.html'])
        .pipe(templateCache('app.templates.js', {
            module: 'calendarApp'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', ['build-vendor-js', 'build-app-js']);
gulp.task('build-vendor-js', function () {
    return gulp.src(mainBowerFiles({
        filter: '**/*.js'
    }))
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-app-js', ['build-template-cache'], function () {
    return gulp.src([
		'./app/**/*.js',
		'./.tmp/templates.js',
		'!./app/bower_components/**'])
		.pipe(ngAnnotate())
        .pipe(uglify())
		.pipe(angularFilesort())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', ['build-vendor-css', 'build-app-css']);
gulp.task('build-vendor-css', function () {
    return gulp.src(mainBowerFiles({
        filter: '**/*.css'
    }))
        .pipe(uglifyCSS())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-app-css', function () {
    return gulp.src([
		'./app/**/*.css',
		'!./app/bower_components/**'])
        .pipe(uglifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('inject', ['build-js', 'build-css'], function () {
	return gulp.src('./app/index.html')
		.pipe(inject(gulp.src('./dist/vendor.min.**', { read: false }), { name: 'vendor', ignorePath: 'dist', addRootSlash: false }))
		.pipe(inject(gulp.src('./dist/app.**', { read: false }), { ignorePath: 'dist', addRootSlash: false }))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean', 'inject']);

gulp.task('publish', ['build'], function () {
	process.chdir('./dist');
	git.init(function (err) {
		if (err) throw err;
		git.checkout('gh-pages', { args: '--orphan', function (err) {
			if (err) throw err;
			git.addRemote('origin', 'https://github.com/Tommatheussen/calendar-app.git', function (err) {
				if (err) throw err;
				git.fetch('origin', 'gh-pages', function (err) {
					git.exec({ args: 'branch --track gh-pages origin/gh-pages' }, function (err, stdout) {
						if (err) throw err;
						console.log(stdout);
						git.status(function (err, stdout) {
							if (err) throw err;
							console.log(stdout);
						});
					});
				});
			});
		});
	});
});