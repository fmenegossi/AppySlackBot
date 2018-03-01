const {TOKEN_URL,DATA_URL} = require('../config/config')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD

const codeToName = require('./codeToName')
const {Api } = require('../models')
const {getApis} = require('../lib/getData')
const createApi = require('../lib/checkData').createApi
const reformatData = require('../lib/reformatData')
const updateApi = require('../lib/checkData').updateApi
const Promise = require('promise');

module.exports = (text) => {
  return new Promise( function(resolve,reject){
  getApis(username,password,TOKEN_URL,DATA_URL)
  .then( function (data){
    let apis = data.d.results.map(api =>  {
      return reformatData(api)
    })
    let api = apis.filter(api => api.name.toLowerCase() === text.toLowerCase())[0]
    if(!!api){
      codeToName(api.changed_by).then(function(name){
        
        console.log('user name',name)

        let update = 'Api :'+api.name+'\n was last changed by:'+name+'\n on:'+api.changed_at
        Api.findOne({'name':api.name},function(err,foundApi){
          if(!!foundApi){
          updateApi(api,foundApi)
        }else { createApi(api) }
        } )
        resolve(update)
      })
      } else {
        let list = apis.map(api =>  api.name)
        let update = 'Api not found we have the following Apis:'+list.join(' ')
        resolve(update)
      }
    })
  })
}
