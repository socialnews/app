var gulp = require('gulp')
var submodules = require('../lib/gulp-git-submodules')

function list (done) {
  var params = {
    command: 'printf $name',
  }
  submodules.task.call(this, params, done)
}

list.description = "list all submodules"

gulp.task('sm:list', list)
