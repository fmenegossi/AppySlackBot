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
const createApi = require('../lib/checkData').createApi

router.post('/api/getstatus', (req, res, next) => {
  getApis(username,password,tokenUrl,dataUrl)
  .then( function (data){
    let apis = data.d.results.map(api =>  {
      return reformatData(api)
    })

    if(typeof req.body.text !== 'undefined'){
      let text = req.body.text.trim().toLowerCase()
      let api = apis.filter(api => api.name.toLowerCase() === text)[0]

      if(!!api){
        let update = 'Api :'+api.name+'\n was last changed by:'+api.changed_by+'\n on:'+api.changed_at
        Api.findOne({'name':api.name},function(err,foundApi){
          if(!!foundApi){
          updateApi(api,foundApi)

        }else { createApi(api) } } )
        res.send({text:update})

        } else {
          let list = apis.map(api =>  api.name)
          let update = 'Api not found we have the following Apis:'+list.join(' ')
          res.send({text:update})
        }
      } else {
        let list = apis.map(api =>  api.name)
        let update = 'No text entered list of Apis:'+list.join(' ')
        res.send({text:update})
      }
    })
    .catch((err)=>{console.log(err)})
  })

  module.exports = router
