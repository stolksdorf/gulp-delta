'use strict';
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var bufferEqual = require('buffer-equal')


module.exports = function (dest, opts) {
	opts = opts || {};
	opts.cwd = opts.cwd || process.cwd();

	if (!dest) {
		throw new gutil.PluginError('gulp-delta', '`dest` required');
	}
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}
		var newPath = path.join(opts.cwd, dest, file.relative);

		if (opts.extension) {
			newPath = gutil.replaceExtension(newPath, opts.extension);
		}

		fs.readFile(newPath, function (err, contents) {
			if (err) {
				// pass through if it doesn't exist
				if (err.code === 'ENOENT') {
					this.push(file);
					return cb();
				}
				this.emit('error', new gutil.PluginError('gulp-delta', err));
				this.push(file);
				return cb();
			}

			var compare = file.contents;
			//Check for streams
			if(file.contents._readableState){
				compare = file.contents._readableState.buffer[0];
			}

			if (!bufferEqual(contents, compare)) {
				this.push(file);
			}
			cb();
		}.bind(this));
	});
};