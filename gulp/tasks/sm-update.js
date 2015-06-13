var gulp = require('gulp')
var submodules = require('../lib/gulp-git-submodules')

function update (done) {
  var params = {
    command: 'echo "**Updating $name $branch**" && git fetch origin && git checkout $branch && git merge origin $branch'
  }
  submodules.task.call(this, params, done)
}

update.description = "git pull origin for all submodules"

gulp.task('sm:update', update)
