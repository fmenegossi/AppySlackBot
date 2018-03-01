const {Api } = require('../models')
// const data = require('../db/seed2.json')
const sendToSlack = require('../lib/sendToSlack')
const reformatData = require('./reformatData')
const codeToName = require('./codeToName')


const updateApi = (api,foundApi) => {
  console.log(api.name,'was changed')
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

 })
 .catch((err)=>{console.log(err)})
}

const readData = (data,platformName) => {

  let apis = data.d.results.map(api =>  {
    return reformatData(api,platformName)
  })
  apis.map(api => {
    Api.findOne({'name':api.name},function(err,foundApi){
      if(err){throw err}
      if(foundApi == null){
        createApi(api)
        codeToName(api.changed_by).then(function(name){
        let update = 'Api on platform:'+platformName+'\n name:'+api.name+'\n was changed by:'+name+'\n on:'+api.changed_at
        sendToSlack(update)
      })
      } else {
        if(foundApi.changed_at.toString()===api.changed_at.toString()){
          console.log('database is unchanged')
          return null
        } else {
          updateApi(api,foundApi)
          codeToName(api.changed_by).then(function(name){
          let update = 'Api on platform:'+platformName+'\n name:'+api.name+'\n was changed by:'+name+'\n on:'+api.changed_at
          sendToSlack(update)
        })
        }
      }
    })
  })
}

module.exports.readData = readData
module.exports.updateApi = updateApi
module.exports.createApi = createApi
// module.exports.reformatData = reformatData
