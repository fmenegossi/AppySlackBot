// Imports
require('dotenv').config()
const http = require('http')
const app = require('./app')
const config = require('./config/config')
const getApis = require('./lib/getData')
const {readData} = require('./lib/checkData')
const exec = require('child_process').exec




// Configs
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD
const tokenUrl = config.TOKEN_URL
const dataUrl = config.DATA_URL
const interval = config.INTERVAL

const getData = function() {
  getApis.getApis(username,password,tokenUrl,dataUrl)
  .then( function (data){
    console.log('data')
    readData(data)
  })
}

getData()

const child = function () {exec('yarn jest tests/slashRoute.test.js',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error)

    }
})};

child()


// Initialization
setInterval(getData, interval)
setInterval(child, 100000)

// Initialization
const port = process.env.PORT || 3030
const server = http.Server(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
