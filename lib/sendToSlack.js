const { SLACKBOT_URL } = require('../config/config.js')
const request = require('superagent')
const { messageToSlack } = require('./messages')


const sendToSlack = (update) => {
  const webhooks = process.env.WEB_HOOKERS.split(" ")
  console.log(webhooks,"HOOKERS")
  webhooks.forEach((hook) => {
    console.log(hook,"hook")
    return request
    .post(hook)
    .send( messageToSlack(update) )
    .then((res)=>{
      console.log('res')})
    .catch((error) =>{
      console.log("error")
    })
  })
}

module.exports = sendToSlack
