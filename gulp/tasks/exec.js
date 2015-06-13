var gulp = require('gulp')
var argv = require('yargs').argv
var submodules = require('../lib/git-submodules')

gulp.task('exec', function(done) {
  submodules.call(this, {
    command: argv.c,
    helpCallback: function () {
      console.log("gulp exec --all -c 'shell-command'")
    }
  },
  done)
})
