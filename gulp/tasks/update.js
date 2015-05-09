var gulp = require('gulp')
var exec = require('child_process').exec
var _ = require('lodash')

gulp.task("update-submodules", function() {
//exec('git submodule update --remote --recursive',function(error, stdout, stderr) {
  exec('git submodule foreach -q --recursive \'branch="$(git config -f $toplevel/.gitmodules submodule.$name.branch)"; git checkout $branch\'',function(error, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
  })
})

var submodules = ['aggregator', 'client','feeder-twitter', 'hub', 'ranker' ]
submodules.forEach(function(submodule) {
  gulp.task('update-' + submodule, ['update-submodules'],function(cb) {
    exec('./bin/update', {cwd: './' + submodule}, function(error, stdout, stderr) {
      cb(error)
    })
  })
})

var tasks = _.map(submodules, function(submodule) {return 'update-' + submodule})
gulp.task('update-all', tasks)
