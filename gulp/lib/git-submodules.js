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
    if(params.helpCallback) {
      params.helpCallback()
    } else {
      var task = this.seq.slice(-1)[0]
      console.log("gulp "+task+" --all #"+task +" all submodules")
      console.log("gulp "+task+" --app <submodule_name> #"+task +" test one submodule")
    }
  }
}
