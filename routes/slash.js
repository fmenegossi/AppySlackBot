const router = require('express').Router()
const {Api } = require('../models')
const sendToSlack = require('../lib/sendToSlack')
const getData = require('../index.js')
router.post('/api/getstatus', (req, res, next) => {
    //getData()
    console.log('data : ' , typeof(req.body))
    Api.findOne({'name':req.body.text},function(err,foundApi){
      console.log('nu', foundApi)

      if(err){throw err}
      if(foundApi == null){
        console.log('there is no Api with this name')
        return null
        }
        console.log(foundApi.changed_at.toString())
        let update = 'Api :'+foundApi.name+'\n was changed by:'+foundApi.changed_by+'\n on:'+foundApi.changed_at
      //sendToSlack(update)
      res.send({text: update})
})
})
module.exports = router
