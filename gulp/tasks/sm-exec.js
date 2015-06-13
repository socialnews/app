var gulp = require('gulp')
var argv = require('yargs').argv
var submodules = require('../lib/gulp-git-submodules')

function exec(done) {
  var params = {
    command: argv.c,
    helpCallback: function () {
      console.log("gulp exec -c 'shell-command'")
    }
  }
  submodules.task.call(this, params, done)
}

exec.description = 'execute arbitrary commands in submodules'

gulp.task('sm:exec', exec)
