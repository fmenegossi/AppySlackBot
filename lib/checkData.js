const {Api } = require('../models')
// const data = require('../db/seed2.json')
const sendToSlack = require('../lib/sendToSlack')

const updateApi = (api,foundApi) => {
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

const createApi = (api) => {
 Api.create(api)
 .then((api) => {
   console.log('new api')
   let update = 'Api :'+api.name+'\n was changed by:'+api.changed_by+'\n on:'+api.changed_at
   sendToSlack(update)
 })
 .catch((err)=>{console.log(err)})
}

const reformatData = (api) => {
  return {
    name:api.name,
    changed_at:new Date(parseInt(api.life_cycle.changed_at.slice(6,-2))),
    changed_by:api.life_cycle.changed_by,
    created_at:new Date(parseInt(api.life_cycle.created_at.slice(6,-2))),
    created_by:api.life_cycle.created_by,
    state:api.state
  }
}

const readData = (data) => {
  let apis = data.d.results.map(api =>  {
    return reformatData(api)
  })
  apis.map(api => {
    Api.findOne({'name':api.name},function(err,foundApi){
      if(err){throw err}
      if(foundApi == null){
        createApi(api)
      } else {
        if(foundApi.changed_at.toString()===api.changed_at.toString()){
          console.log('database is unchanged')
          return null
        } else {
          updateApi(api,foundApi)
        }
      }
    })
  })
}

module.exports = readData
  // readData(data)
