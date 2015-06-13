var gulp = require('gulp')
var submodules = require('../lib/git-submodules')

gulp.task('test', function(done) {
  submodules({
    command: './bin/test'
  }, done)
})
