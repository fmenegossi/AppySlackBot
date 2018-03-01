// Imports
require('dotenv').config()
const http = require('http')
const app = require('./app')
const config = require('./config/config')
const getApis = require('./lib/getData')
const {readData} = require('./lib/checkData')

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

// Initialization
const port = process.env.PORT || 3030
const server = http.Server(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
