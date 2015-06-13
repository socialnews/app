var gulp = require('gulp')
var spawn = require('child_process').spawn

var child = require('child_process');

function install (done) {
  var child = spawn('git', ['submodule', 'update', '--init', '--recursive']);
  child.stdout.on("end", function() { done() });
  child.stdout.pipe(process.stdout)
}

install.description = "install all submodules"

gulp.task('sm:install', install)
