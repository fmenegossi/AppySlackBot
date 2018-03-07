const codeToName = require('./codeToName')
const { Api , Platform } = require('../models')
const { getApis } = require('../lib/getData')
const reformatData = require('../lib/reformatData')
const Promise = require('promise')
const { readData } = require('./checkData')

module.exports = (text) => {
  console.log('./lib/getStatus')
  return new Promise(( resolve,reject ) => {
    const receiveText = (text) => {
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
      getApis(foundPlatform.sap_auth, foundPlatform.url)
        .then((data) => {
          readData(data, foundPlatform.name)

          const apis = data.d.results.map((api) => {
            return reformatData(api, foundPlatform.name)
          })

          const api = apis.filter(api => api.name.toLowerCase() === name.toLowerCase())[0]
          console.log('ln38:', api)
          if(!!api){
            returnApi(api)
          } else {
            const list = apis.map(api => ` - ${api.name} on ${api.platformName}`)
            const update = `\nApi not found!\n
              We have the following APIs:\n
              ${list.join('\n')}`
            resolve(update)
          }
        })
        .catch((err) => { console.log(err) })
    }

    const returnApi = (api) => {
      codeToName(api.changed_by).then((name) => {
        const update = `\nApi on platform: ${api.platformName}
           --> Name: ${api.name}
           --> Modified by: ${name}
           --> At:${api.changed_at}`
        resolve(update)
      })
    }

    receiveText(text)
  })
}
