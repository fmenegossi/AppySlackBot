const { Api } = require('../models')
// const data = require('../db/seed2.json')
const sendToSlack = require('../lib/sendToSlack')
const reformatData = require('./reformatData')
const codeToName = require('./codeToName')


const updateApi = (api, foundApi) => {
  console.log(api.name,'was changed')
  const updatedApi = { ...foundApi, ...api }

  Api.findByIdAndUpdate(foundApi._id,
    { updatedApi },
    { new: true })
    .then(api => { console.log(api) })
    .catch(error => { console.log(error) })
}

const createApi = (api) => {
 Api.create(api)
 .then((api) => {
   console.log('new api')
 })
 .catch((err)=>{console.log(err)})
}

const returnApi = (api) => {
  codeToName(api.changed_by)
    .then((name) => {
      const update = `Api on platform: ${api.platformName}
         --> Name: ${api.name}
         --> Modified by: ${name}
         --> At:${api.changed_at}`
      sendToSlack(update)
    })
}

const readData = (data, platformName) => {
  return data.d.results.map(api => {
    return reformatData(api, platformName)
  })

  apis.map(api => {
    Api.findOne({ name: api.name, platformName: platformName })
      .then((foundApi) => {
        if(!foundApi){
          createApi(api)
          returnApi(api)
        } else {
          if(foundApi.changed_at.toString() === api.changed_at.toString()){
            console.log('database is unchanged')
          } else {
            updateApi(api, foundApi)
            returnApi(api)
          }
        }
      })
      .catch((error) => { throw error })
  })
}

module.exports.readData = readData
module.exports.updateApi = updateApi
module.exports.createApi = createApi
