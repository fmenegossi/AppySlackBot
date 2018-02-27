const request = require('superagent')
const slackBot = 'https://hooks.slack.com/services/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'
const {Result,User } = require('../models')
const data = require('../db/seed2.json')

const sendToSlack = (update) =>{
  return request
    .post(slackBot)
    .send({'text':update})
    .then((res)=>{
      console.log('res')})
    .catch((error) =>{
      console.log("error")
    })
}

const readData = (data) => {

  let apis = data.d.results.map(api =>  {
    var object = {}
    object.name = api.name
    object.changed_at = new Date(parseInt(api.life_cycle.changed_at.slice(6,-2)))
    object.changed_by = api.life_cycle.changed_by
    return object
  })

  apis.map(api => {
    Result.findOne({'name':api.name},function(err,foundApi){
     if(foundApi.changed_at.toString()===api.changed_at.toString()){
       console.log('database is unchanged')
       return null
     } else {
       let update = 'Api :'+api.name+'\n was changed by:'+api.changed_by+'\n on:'+api.changed_at
       sendToSlack(update)
     }
   })
  })
}


readData(data)
