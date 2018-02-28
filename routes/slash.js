const router = require('express').Router()

router.post('/api/getstatus', (req, res, next) => {
    const result = {
        text: "status from AppyBot:",
        attachments: [
            {
                text: "Hello! It's status from AppyBot!"
            }
        ]
    }

    res.send(result)


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
