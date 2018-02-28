// Imports
const express = require('express')
const bodyParser = require('body-parser')

// App
const app = express()

// Routes
const slashRouter = require('./routes/slash')
const blankRoot = require('./routes/blankRoot')

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(slashRouter)
  .use(blankRoot)

  .use((req, res, next) => {
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

module.exports = app