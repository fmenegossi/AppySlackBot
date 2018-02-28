const {Api } = require('../models')
const router = require('express').Router()
const sendToSlack = require('../lib/sendToSlack')

// router.post('/api/getstatus', (req, res, next) => {
//
//     console.log('data : ' , req.body)
//
//     res.send(
//     {
//         "text": req.body.text,
//         "attachments": [
//             {
//                 "text":"Hello! It's status from AppyBot!"
//             }
//         ]
//     })



router.post('/api/getstatus', (req, res, next) => {
    console.log(`${req.body.text}`)
    Api.findOne({'name':req.body.text},function(err, foundApi){
      console.log(foundApi, "Api")
      if(err){console.log(err)
      throw err}
      if(foundApi==null){
        console.log('there is no Api with this name')
        return null
      }
      sendToSlack(foundApi)
      res.send(foundApi)
      })
})
module.exports = router

  // const apiName = req.params.apiname
  //
  // getApis()
  //   .then(() => {
  //     Api.find({name: apiName})
  //       .then((api) => {
  //         if(!api){
  //           err = new Error(`API ${apiName} not found`)
  //           err.status = 404
  //           next(err)
  //         }
  //
  //         res.json(api)
  //       })
  //   })
// })

// module.exports = router
