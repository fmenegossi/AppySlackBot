const request = require('superagent')
const Promise = require('promise');
const getToken = require('./getToken').getToken

const getApis = (username, password,getTokenUrl, getDataUrl) => {
  console.log('./lib/getData')
  return new Promise((resolve, reject) => {
    const getData = (token) => {
      console.log('getData()')
      request
        .get(getDataUrl)
        .set('x-csrf-token', token)
        .auth(username, password)
        .then((res) => {
          console.log(`text: ${res.text}`)
          resolve( JSON.parse(res.text) )
        })
        .catch((err) => {
          console.error('Error getting data', err)
        })
    }
    getToken(username,password,getTokenUrl)
      .then((token) => {
        getData(token)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

module.exports =  { getApis }
