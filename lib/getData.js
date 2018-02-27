const request = require('superagent')

const Promise = require('promise');
const getToken = require('./getToken').getToken



   function getApis(username,password,getTokenUrl,getDataUrl){
      return new Promise( function(resolve,reject){
        const getData = (token) => {
           console.log('getData')

             request
               .get(getDataUrl)
               .set('x-csrf-token', token)
               .auth(username, password)
               .then((res) => {
                  console.log('in then')
                  resolve( JSON.parse(res.text) )

               })
               .catch((err) => {
                 console.error('Error getting data', err)
               })
       }
        getToken(username,password,getTokenUrl)
        .then(function (token){
          getData(token)
        })



  })
  }

module.exports =  { getApis }
