const { SLACKBOT_URL } = require('../config/config.js')
const request = require('superagent')
const { messageToSlack } = require('./messages')
const { SlackWorkspace } = require('../models')


const sendToSlack = (update) => {
  SlackWorkspace.find().then(function(slackWorkspaces){
    console.log(slackWorkspaces)
      slackWorkspaces.map((slackWorkspace )=>{
        return request
        .post(slackWorkspace.webHook)
        .send( messageToSlack(update) )
        .then((res)=>{
          console.log('res')})
        .catch((error) =>{
          console.log("error")
          console.log(error)
        })
      })
    })
}

module.exports = sendToSlack
