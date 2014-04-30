# [gulp](http://gulpjs.com)-delta

> Only pass through delta filesby comparing buffer contents

Based off of [sindresorhus's](https://www.npmjs.org/~sindresorhus) [gulp-delta](https://www.npmjs.org/package/gulp-delta). Compares streams based on buffer contents incase the source of the stream was not a file.

## Usage

```javascript
var gulp = require('gulp');
var delta = require('gulp-delta');
var name = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var browersify = require('browserify');

gulp.task('js', function () {
	browserify('./src/app.js')
		.bundle()
		.pipe(name('bundle.js'))
		.pipe(uglify())
		.pipe(delta('./prod'))
		.pipe(gulp.dest('./prod'))
		.pipe(livereload(lr_server));
});
```
