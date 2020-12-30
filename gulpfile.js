var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function() {
    return gulp.src('./dist/*.js')
        .pipe(concat('io-player.pkg.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', gulp.series('concat'));
