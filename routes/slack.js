const request = require('superagent')
const {Api,User } = require('../models')
// const data = require('../db/seed2.json')
const {SLACKBOT_URL} = require('../config/config.js')

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

const readData = (data) => {
  let apis = data.d.results.map(api =>  {
    var object = {}
    object.name = api.name
    object.changed_at = new Date(parseInt(api.life_cycle.changed_at.slice(6,-2)))
    object.changed_by = api.life_cycle.changed_by
    return object
  })
  console.log(apis,"APIS")
  apis.map(api => {
    Api.findOne({'name':api.name},function(err,foundApi){
      // console.log(foundApi.changed_at,api.changed_at,'changed at')
      if(err){throw err}
      if(foundApi.changed_at.toString()===api.changed_at.toString()){
       console.log('database is unchanged')
       return null
      } else {
       console.log(api.name,'was changed')
       let update = 'Api :'+api.name+'\n was changed by:'+api.changed_by+'\n on:'+api.changed_at
       sendToSlack(update)
       foundApi.changed_at = api.changed_at
       foundApi.changed_by = api.changed_by
       Api.findByIdAndUpdate(foundApi._id, {$set: foundApi},{new:true})
        .then((api)=>{
          console.log(api)
        })
        .catch((err)=>{
          console.log(err)
        })
     }
   })
  })
}

module.exports = readData
// readData(data)
