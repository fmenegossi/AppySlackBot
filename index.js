// Imports
require('dotenv').config()
const http = require('http')
const app = require('./app')
const getApis = require('./lib/getData')
const {readData} = require('./lib/checkData')
const exec = require('child_process').exec
const config = require('./config/config')
const {Platform} = require('./models')

// Configs
const interval = config.INTERVAL

console.log('test')

const getData = function() {
  console.log('getData')
  Platform.find().then(function(platforms){
    // console.log(platforms[0].name)
      platforms.map((platform )=>{
        let getDataUrl = (platform.url+'/APIProxies?$select=name,life_cycle,state&$format=json')
        getApis.getApis(platform.username,platform.password,platform.url,getDataUrl)
          .then(function(data){
            console.log('data',data.d.results[0].name)
            readData(data,platform.name)
          })
    })
  })
  .catch((err)=>{console.log(err)})
}
getData()

// Initialization
setInterval(getData, interval)
// Initialization
const port = process.env.PORT || 3030
const server = http.Server(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
