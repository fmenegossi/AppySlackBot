const { SLACKBOT_URL } = require('../config/config.js')
const request = require('superagent')
const { messageToSlack } = require('./messages')


const sendToSlack = (update) => {
  console.log('.lib/sendToSlack')
  return request
  .post(SLACKBOT_URL)
  .send( messageToSlack(update) )
  .then((res) => { console.log('ln11:', res) })
  .catch((error) => { console.log('ln12:', error) })
}

module.exports = sendToSlack
