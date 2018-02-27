const {SLACKBOT_URL} = require('../config/config.js')
const request = require('superagent')


const sendToSlack = (update) =>{
  return request
  .post(SLACKBOT_URL)
  .send({'text':update})
  .then((res)=>{
    console.log('res')})
  .catch((error) =>{
    console.log("error")
  })
}

module.exports = sendToSlack
