const express = require('express')

const http = require('http')

const getApis= require('./db/seed')

const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 3030

const app = express()
const server = http.Server(app)


const getData = function() {
  getApis.getApis(function(data){
      console.log('data : ', data.d.results)
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
