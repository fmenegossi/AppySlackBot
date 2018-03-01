// Imports
require('dotenv').config()
const http = require('http')
const app = require('./app')
const getApis = require('./lib/getData')
const {readData} = require('./lib/checkData')
const exec = require('child_process').exec
const seedPlatforms = require('./db/seedPlatform')
const config = require('./config/config')
const {Platform} = require('./models')
// Configs
const interval = config.INTERVAL

console.log('test')
//seed platforms

seedPlatforms()


const getData = function() {
  Platform.find({}).then(function(platforms){
    console.log(platforms)
      platforms.map((platform )=>{
        getApis.getApis(platform.username,platform.password,platform.url,(platform.url+'/APIProxies?$select=name,life_cycle,state&$format=json'))
      .then(function(data){
        console.log('data',data.d.results[0].name)
        readData(data,platform.name)
      })
    })
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
})}

// child()


// Initialization
setInterval(getData, interval)
// setInterval(child, 100000)

// Initialization
const port = process.env.PORT || 3030
const server = http.Server(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
