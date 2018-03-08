const request = require('superagent')
const Promise = require('promise');

const getToken = (sapAuth, patformUrl) => {
  console.log('./lib/getToken')
  return new Promise( (resolve,reject) => {
    request
      .head(patformUrl)
      .set('x-csrf-token','fetch')
      .set('Authorization', `Basic ${sapAuth}`)
      .then((res) => {
        if(!!res.header['x-csrf-token']) {
          console.log('Authenticated!')
          resolve(res.header['x-csrf-token'])
        }else{
          console.log('error loging in')
          reject('error while authenticating')
        }
      })
      .catch((err) => {
        console.error('Failed to authenticate!', err.message)
      })
  })
}

module.exports =  { getToken }
