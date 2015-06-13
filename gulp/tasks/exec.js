var gulp = require('gulp')
var argv = require('yargs').argv
var submodules = require('../lib/git-submodules')

gulp.task('exec', function(done) {
  submodules({
    command: argv.c
  },
  done)
})
