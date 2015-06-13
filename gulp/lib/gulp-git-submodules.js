var exec = require('child_process').exec
var argv = require('yargs').argv
module.exports = {
  task: task
}
function task (params, callback) {
  var command = 'branch="$(git config -f ../.gitmodules submodule.$name.branch)" && ' + params.command
  var done = function(error, stdout, stderr) {
    if (error) {
      callback(error)
    } else {
      console.log(stdout)
    }
  }
  if (argv.help || argv.h) {
    if(params.helpCallback) {
      params.helpCallback()
    } 
    var task = this.seq.slice(-1)[0]
    console.log("gulp "+task+" # call "+task +" all submodules")
    console.log("gulp "+task+" -o <submodule> --only <submodule> # call "+task +" on only the named submodules")
    console.log("gulp "+task+" -e <submodule> --except <submodule> # call "+task +" on all except the named submodules")
  } else {
    targetSubmodules(function (modules) {
      for(var i in modules) {
        var submodule = modules[i]
        exec('name='+submodule+' && '+command, {cwd: './' + submodule}, done)
      }
    })
  }
}

function targetSubmodules(done) {
  exec('git submodule foreach -q --recursive \'echo $name\'', function(error, stdout, stderr) {
    names = stdout.split("\n")
    names.splice(-1, 1)

    names = withIncludedSubmodules(names) 
    names = withoutExcludedSubmodules(names) 
    done(names)
  })
}

function withIncludedSubmodules(names) {
  if (!argv.o && !argv.only) {return names}

  var included = []
  if (argv.o) { included = addItemOrArray(included, argv.o) }
  if (argv.only) { included = addItemOrArray(included, argv.only) }
  names = names.filter( function (submodule) {
    return(included.indexOf(submodule) >= 0) 
  })
  return names
}

function withoutExcludedSubmodules(names) {
  var excluded = []
  if (argv.e) { excluded = addItemOrArray(excluded, argv.e) }
  if (argv.except) { excluded = addItemOrArray(excluded, argv.except) }
  names = names.filter( function (submodule) {
    return(excluded.indexOf(submodule) < 0) 
  })
  return names
}

function addItemOrArray(array, itemOrArray) {
  if (Array.isArray(itemOrArray)) {
    array = array.concat(itemOrArray)
  } else if (itemOrArray) {
    array.push(itemOrArray)
  }
  return array
}
