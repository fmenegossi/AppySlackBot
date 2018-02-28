const router = require('express').Router()

router
  .get('/', (req, res, next) => {
    console.log(`It's a blank root!`)
    res.send('Ok')
  })

module.exports = router
