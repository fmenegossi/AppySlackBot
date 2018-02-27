const request = require('superagent')

const Promise = require('promise');

function getToken(username,password,tokenUrl){

  return new Promise( function(resolve,reject){

    console.log('in promise')
    request
      .head(tokenUrl)
      .auth(username, password)
      .set('x-csrf-token','fetch')

      .then((res) => {

        if(!!res.header['x-csrf-token']){
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
