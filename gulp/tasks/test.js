var gulp = require('gulp')
var submodules = require('../lib/gulp-git-submodules')

gulp.task('test', function(done) {
  params = {
    command: 'printf "${name}: " && ./bin/test',
  }
  submodules.task.call(this, params, done) 
})
