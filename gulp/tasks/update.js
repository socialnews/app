var gulp = require('gulp')
var submodules = require('../lib/git-submodules')

gulp.task('update', function(done) {
  submodules({
    command: 'echo "\n**Updating $name $branch**\n" && git fetch origin && git checkout $branch && git merge origin $branch && ./bin/update'
  }, done)
})
