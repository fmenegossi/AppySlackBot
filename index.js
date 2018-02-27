const express = require('express')
require('dotenv').config()
const config = require('./config/config')
const http = require('http')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD
const tokenUrl = config.TOKEN_URL
const dataUrl = config.DATA_URL
const slackBotUrl = config.SLACKBOT_URL
const getApis = require('./lib/getData')
const readData = require('./routes/slack.js')


const port = process.env.PORT || 3030
const app = express()
const server = http.Server(app)

const getData = function() {
  getApis.getApis(username,password,tokenUrl,dataUrl)
  .then( function (data){
      console.log('data',data)
      readData(data)
  })
}

//setInterval( getData ,3000)
getData()

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

server.listen(port)
