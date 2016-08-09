var gulp = require('gulp');
    
gulp.task('clean', function (cb) {
    var del = require('del');
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
    var mainBowerFiles = require('main-bower-files');
    var minify = require('gulp-minify');
    var concat = require('gulp-concat');

    return gulp.src(mainBowerFiles({
        filter: '**/*.js'
    }))
        .pipe(minify({
            noSource: true,
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', function () {
    var mainBowerFiles = require('main-bower-files');
    var minifyCSS = require('gulp-clean-css');
    var concat = require('gulp-concat');

    return gulp.src(mainBowerFiles({
        filter: '**/*.css'
    }))
        .pipe(minifyCSS({
           // noSource: true,
            /*ext: {
                min: '.min.css'
            }*/
        }))
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./dist'));
});



gulp.task('build', ['clean', 'build-js']);