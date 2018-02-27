const router = require('express').Router()

router.post('/slashcom/:apiname', (req, res, next) => {
  const apiName = req.params.apiname

  getApis()
    .then(() => {
      Api.find({name: apiName})
        .then((api) => {
          if(!api){
            err = new Error(`API ${apiName} not found`)
            err.status = 404
            next(err)
          }

          res.json(api)
        })
    })
})

module.exports = router
