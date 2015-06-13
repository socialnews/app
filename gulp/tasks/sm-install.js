var gulp = require('gulp')
var exec = require('child_process').exec

function install (done) {
  exec('git submodule install --init', function (error, stdout, stderr) {
    if (error) {
      console.log(stderr)
    } else {
      console.log(stdout)
    }
  })
}

install.description = "install all submodules"

gulp.task('sm:install', install)
