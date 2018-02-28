const router = require('express').Router()
const SapUser = require('../models/sapUser')

router
  .post('/api/sapuser', (req, res, next) => {
    const data = req.body.text
    let [code, user] = data.split(':')

    code = code.trim()
    user = user.trim()


    if(!user || !code) {
      const err = new Error('User/Code not existent!')
      err.status = 422
      next(err)
    }

    SapUser.find({code: code})
      .then((sapUser) => {
        if(!sapUser) {
          const newSapUser = new SapUser({name: user, code: code})
          newSapUser.save((error) => {
            const err = new Error(error)
            err.status = 422
            next(err)
          })
        } else {
          sapUser.name = user

          sapUser.save()
        }
      })
  })

module.exports = router
