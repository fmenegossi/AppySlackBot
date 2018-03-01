const router = require('express').Router()
const SapUser = require('../models/sapUser')

router
  .post('/api/sapuser', (req, res, next) => {
    const data = req.body.text
    let [code, name] = data.split(':')

    code = code.trim()
    name = name.trim()

    console.log(code, name)

    if(!name || !code) {
      const err = new Error('User and/or Code not present!')
      next(err)
    }

    SapUser.find({code: code})
      .then((sapUser) => {
        if(!sapUser) {
          SapUser.create({name: name, code: code}, (error, user) => {
            if(error) { next(error) }
            res.send(user)
          })
        } else {
          SapUser.findByIdAndUpdate(sapUser._id, {name: name}, { new: true })
            .then((user) => {
              res.send(user)
            })

          // sapUser.save((error) => {
          //   if(error) {
          //     const err = new Error(error)
          //     err.status = 422
          //     next(err)
          //   }
          // })
        }
      })
  })

module.exports = router
