const request = require('superagent')
const slackBot = 'https://hooks.slack.com/services/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'
const {Result,User } = require('../models')


const readData = (data) => {
  let apis = data.d.results.map(api =>  {name:api.name,changed_at:api.life_cycle.changed_at,changed_by:api.life_cycle.changed_by})

  let changedApis = Result.findOne({'name':api.name},'changed_at', function(err, program){
      apis.filter((api)=>{
        if(program.changed_at===api.changed_at)
      })
    }
  )
  if(changedApis.length > 0){
    changedApis.map((api)=>
  )
  }
  changeApis.map(api, =>
    let update = 'Api :'+api.name+'\n was changed by:'+api.changed_by+'\n on:'+api.changed_at)
    sendToSlack(update)
}

const sendToSlack = (update) =>{
  return request
    .post(slackBot)
    .send({'text':update})
    .then((res)=>{
      console.log(res)})
    .catch((error) =>{
      console.log(error)
    })
}

sendToSlack('API:testnu\nWorked on by:P1942719152\nOn date:/Date(1519649300960)/')
