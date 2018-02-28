const router = require('express').Router()

router.post('/api/getstatus', (req, res, next) => {

    console.log('data: ' , req.body)

    res.send(
    {
        "text": "status from AppyBot:",
        "attachments": [
            {
                "text":"Hello! It's status from AppyBot!"
            }
        ]
    })

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
