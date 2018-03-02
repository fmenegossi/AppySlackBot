const router = require('express').Router()
const exec = require('child_process').exec

router.post('/api/runtests', (req, res, next) => {

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

})

module.exports = router
