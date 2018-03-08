const request = require('superagent')
const { generalMsg } = require('./messages')
const { SlackWorkspace } = require('../models')

const sendToSlack = (update) => {
  SlackWorkspace.find().then(function(slackWorkspaces){
    console.log(slackWorkspaces)
      slackWorkspaces.map((slackWorkspace )=>{
        return request
        .post(slackWorkspace.webHook)
        .send( generalMsg({data:update,msg:'showSingleApi'}) )
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
