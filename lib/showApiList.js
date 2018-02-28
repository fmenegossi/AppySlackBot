const {TOKEN_URL,DATA_URL} = require('../config/config')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD

const {getApis} = require('../lib/getData')
const Promise = require('promise')

module.exports = (text) => {
  return new Promise( function(resolve,reject){
  getApis(username,password,TOKEN_URL,DATA_URL)
  .then( function (data){
    let list = data.d.results.map(api => {
      return api.name
    })
    resolve('list of Apis: '+list.join(', '))
  })
})
}
