var gulp = require('gulp')
var argv = require('yargs').argv
var exec = require('child_process').exec
var _ = require('lodash')

var submodules = ['aggregator', 'client','feeder-twitter', 'hub', 'ranker' ]

gulp.task('update', function() {
  var updateCommand = 'branch="$(git config -f ../.gitmodules submodule.$name.branch)" && echo "\n**Updating $name $branch**\n" && git fetch origin && git checkout $branch && git merge origin $branch && ./bin/update'
  done = function(error, stdout, stderr) {
    console.log(stdout)
  }
  if (argv.all) {
    exec('git submodule foreach -q --recursive \''+updateCommand+'\'', done)
  } else if (argv.app) {
    var submodule = argv.app
    exec('name='+submodule+' && '+updateCommand, {cwd: './' + submodule}, done)
  } else {
    console.log("gulp update --all #update all submodules")
    console.log("gulp update --app <appname> #update one submodule")
  }
})

var tasks = _.map(submodules, function(submodule) {return 'update-' + submodule})
gulp.task('update-all', tasks)
