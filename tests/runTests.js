const exec = require('child_process').exec

const child = function (route) {exec(`yarn jest tests/${route}.test.js`,
function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error)

  }
})}

const testsRoutes = ["slashRoute", "getData"]

testsRoutes.map(test => child(test))

// maybe code to run them automically
// setInterval(function(){
//   testsRoutes.map(test => child(test))
// }, 4000000)
