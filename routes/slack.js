const request = require('superagent')
const slackBot = 'https://hooks.slack.com/services/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'
const {Result,User } = require('../models')
const seed = require('../db/seed.json')
const data = require('../db/seed2.json')

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

const readData = (data) => {
  let stored = Result.find()
  let apis = data.d.results.map(api =>  {
    var object = {}
    object.name = api.name
    object.changed_at = api.life_cycle.changed_at
    object.changed_by = api.life_cycle.changed_by
    return object
  })
    console.log(apis,"recieved")
    let changedApis = apis.map(api => {stored
                                        .where('name').equals(api.name)
                                        .where('changed_at').ne(api.changed_at)})
  console.log(stored,'stored')
  if(changedApis.length !== 0){
    changedApis.map(api =>{
      let update = 'Api :'+api.name+'\n was changed by:'+api.changed_by+'\n on:'+api.changed_at
      sendToSlack(update)})
  }
}


// console.log(seed.d.results)

const reworkedSeed = seed.d.results.map(api => {
  var object = {}
  object.name = api.name
  object.changed_at = api.life_cycle.changed_at
  object.changed_by = api.life_cycle.changed_by
  object.created_at = api.life_cycle.created_at
  object.created_by = api.life_cycle.created_by
  object.state = api.state
  return object
})
console.log('REWORKEDSEED',reworkedSeed)
Result.create(reworkedSeed)
//
// sendToSlack('API:testnu\nWorked on by:P1942719152\nOn date:/Date(1519649300960)/')
readData(data)
