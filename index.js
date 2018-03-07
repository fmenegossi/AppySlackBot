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

console.log('./index')

const getData = () => {
  Platform.find()
    .then((platforms) => {
      console.log('ln21:', platforms)
      platforms.map((platform) => {
        getApis.getApis(platform.sap_auth, platform.url)
          .then((data) => {
            console.log('ln25:', data.d.results)
            readData(data, platform.name)
          })
      })
    })
    .catch((err) => { console.log(err) })
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
