var gulp = require('gulp')
var task = require('gulp-git-submodule').task

gulp.task('test', function(done) {
  params = {
    command: 'printf "${name}: " && ./bin/test',
  }
  task.call(this, params, done) 
})
