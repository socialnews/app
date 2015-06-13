var argv = require('yargs').argv
var exec = require('child_process').exec

module.exports = function(params, callback) {
  var command = 'branch="$(git config -f ../.gitmodules submodule.$name.branch)" && ' + params.command
  var done = function(error, stdout, stderr) {
    if (error) {
      callback(error)
    } else {
      console.log(stdout)
    }
  }
  if (argv.all) {
    exec('git submodule foreach -q --recursive \''+command+'\'', done)
  } else if (argv.app) {
    var submodule = argv.app
    exec('name='+submodule+' && '+command, {cwd: './' + submodule}, done)
  } else {
    console.log("gulp test --all #test all submodules")
    console.log("gulp test --app <appname> #test one submodule")
  }
}
