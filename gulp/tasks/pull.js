var gulp = require('gulp')
var exec = require('child_process').exec

gulp.task("pull", function() {
  exec('git pull --recurse-submodules',function(error, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
  })
})
