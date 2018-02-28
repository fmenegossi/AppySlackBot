const {Api } = require('../models')
const router = require('express').Router()

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
    console.log('data : ' , req.body.text)
    Api.findOne({'name':req.body.text},function(err,foundApi){
      if(err){throw err}
      if(foundApi == null){
        console.log('there is no Api with this name')
        return null
        }
      }).then((foundApi) => {
      res.send(foundApi)
    })
    .catch((error) => next(error))
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
})

module.exports = router
