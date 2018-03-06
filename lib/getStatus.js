const codeToName = require('./codeToName')
const { Api , Platform } = require('../models')
const { getApis } = require('../lib/getData')
const reformatData = require('../lib/reformatData')
const Promise = require('promise')
const { readData } = require('./checkData')

module.exports = (text) => {
  console.log('./lib/getStatus')
  return new Promise(( resolve,reject ) => {
    const recieveText = (text) => {
      let { name,platformName } = JSON.parse(text)
      console.log(!name,!platformName,"PARSED")
      if(!name || !platformName){
        console.log('wrong in put')
        resolve("missing Api name or Platform name")
      } else {
        console.log('fetchPlatform',platformName,name)
        fetchPlatform(platformName,name)
      }
    }

    const fetchPlatform = (platformName,name) => {
      console.log(`name: ${name}`, `platformName: ${platformName}`)
      Platform.findOne({ name: platformName },(err,foundPlatform) => {
        console.log(!foundPlatform,"found platform")
        if(!foundPlatform){resolve("Platform not found")} else {
          updateApis(foundPlatform,name)
        }
      })
    }

    const updateApis = (foundPlatform,name) => {
      let getDataUrl = (foundPlatform.url+'/APIProxies?$select=name,life_cycle,state&$format=json')
      console.log('ln28:', `getDataUrl: ${getDataUrl}`)
      getApis(foundPlatform.username,foundPlatform.password,foundPlatform.url,getDataUrl)
      .then( (data) => {
        readData(data,foundPlatform.name)
        let apis = data.d.results.map(api => {
          return reformatData(api,foundPlatform.name)
        })
        let api = apis.filter(api => api.name.toLowerCase() === name.toLowerCase())[0]
        console.log('ln38:', api)
        if(!!api){
          returnApi(api)
        } else {
          let list = apis.map(api =>  `${api.name} -- ${api.platformName}`)
          let update = 'Api not found we have the following Apis:'+list.join(', ')
          resolve(update)
        }
      })
      .catch((err) => { console.log(err)})
    }

    const returnApi = (api) => {
      codeToName(api.changed_by).then((name) => {
        let update = 'Api on platform:'+api.platformName+'\n name:'+api.name+'\n was changed by:'+name+'\n on:'+api.changed_at
        resolve(update)
      })
    }
    recieveText(text)
  })
}
