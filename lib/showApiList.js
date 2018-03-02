// const {TOKEN_URL,DATA_URL} = require('../config/config')
// const username = process.env.SAP_EMAIL
// const password = process.env.SAP_PASSWORD
const {Platform,Api} = require('../models')
const {getApis} = require('../lib/getData')
const Promise = require('promise')


module.exports = (text) => {
  return new Promise( function(resolve,reject){
    Platform.find()
    .then((platforms) => {
        let apiList = []
        platforms.map((platform) => {
          Api.find({'platformName':platform.name})
          .then((apis) => {
            list = apis.map((api) => {
              return api.name
            })
            line = ('list for platform: '+platform.name+': '+list.join(', '))
            // console.log(line)
            apiList.push(line)
          })
          .then(() => {
            // console.log(apiList,'APILIST')
            resolve((apiList.join('\n')))
          })
        })

      })
    })
}
