const getApis = (response) => {

  const request = require('superagent')
  const username = 'niolarenato01@gmail.com'
  const password = 'l0JaqZSvwL*!Y@0$3t'

  const getTokenUrl = 'https://apiportalu34f5b50f-p1942719152trial.hanatrial.ondemand.com/apiportal/api/1.0/Management.svc/APIProxies?select=name,life_cycle,state&format=json'
  const getDataUrl = 'https://apiportalu34f5b50f-p1942719152trial.hanatrial.ondemand.com/apiportal/api/1.0/Management.svc/APIProxies?$select=name,life_cycle,state&$format=json'


  const getData = (token) => {
      console.log('getData : ',token)

      request
        .get(getDataUrl)
        .set('x-csrf-token', token)
        .auth(username, password)
        .then((res) => {
          response( JSON.parse(res.text) )

        })
        .catch((err) => {
          console.error('Error getting data', err)
        })

  }


  request
    .head(getTokenUrl)
    .auth(username, password)
    .set('x-csrf-token','fetch')

    .then((res) => {
      console.log('Authenticated!')

      getData(res.header['x-csrf-token'])
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}

module.exports =  { getApis }
