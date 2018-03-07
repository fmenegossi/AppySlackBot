const request = require('superagent')
const Promise = require('promise');
const getToken = require('./getToken').getToken

const getApis = (sapAuth, platformUrl) => {
  console.log('./lib/getData')

  return new Promise((resolve, reject) => {
    const getData = (token) => {
      request
        .get(platformUrl)
        .set('x-csrf-token', token)
        .set('Authorization', `Basic ${sapAuth}`)
        .then((res) => {
          resolve(JSON.parse(res.text))
        })
        .catch((err) => { console.error('Error getting data', err) })
    }

    getToken(sapAuth, platformUrl)
      .then((token) => {
        getData(token)
      })
      .catch((err) => {
        console.log('ln26', err)
      })
  })
}

module.exports =  { getApis }
