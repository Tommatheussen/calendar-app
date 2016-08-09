var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
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
    var templateCache = require('gulp-angular-templatecache');
    
    return gulp.src('./app/**/*.html')
        .pipe(templateCache({
            module: 'calendarApp'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', function () {
    var b = browserify({
        entries;
    })
});