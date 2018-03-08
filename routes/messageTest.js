const router = require('express').Router()
const request = require('superagent')

router
  .post('/api/test',(req,res,next) => {
    request
      .post(SLACKBOT_URL)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  })
