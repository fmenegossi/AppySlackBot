const router = require('express').Router()
const updateApi = require('../lib/checkData').updateApi
const reformatData = require('../lib/reformatData')
const {getApis} = require('../lib/getData')
const config = require('../config/config')
const sendToSlack = require('../lib/sendToSlack')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD
const tokenUrl = config.TOKEN_URL
const dataUrl = config.DATA_URL
const {Api } = require('../models')

router.post('/api/getstatus', (req, res, next) => {
  let text = req.body.text.trim().toLowerCase()
  if(!!text){
    getApis(username,password,tokenUrl,dataUrl)
    .then( function (data){
      let apis = data.d.results.map(api =>  {
        return reformatData(api)
      })
      let api = apis.filter(api => api.name.toLowerCase() === text)[0]
      if(!!api){
        let update = 'Api :'+api.name+'\n was last changed by:'+api.changed_by+'\n on:'+api.changed_at
        Api.findOne({'name':api.name},function(err,foundApi){
        updateApi(api,foundApi)})
        res.send({text:update})
      } else {
        // let list =
        let update = 'Api not found'
        res.send({text:update})
      }
    })
  } else {
    let update = 'No text entered'
    res.send({text:update})
  }
})

module.exports = router
