const router = require('express').Router()
const SapUser = require('../models/sapUser')
const { confirmUserCreated , confirmUserUpdated } = require('../lib/messages.js')

router
  .post('/api/sapuser', (req, res, next) => {
    const data = req.body.text
    let [code, name] = data.split(':')
    if(!name || !code) {
      const err = new Error('User and/or Code not present!')
      res.send('err')
    }

    console.log(code, name)
    code = code.trim()
    name = name.trim()



    SapUser.findOne({code: code})
      .then((sapUser) => {
        if(!sapUser) {
          SapUser.create({name: name, code: code}, (error, user) => {
            if(error) { next(error) }
            res.send( confirmUserCreated(user) )
          })
        } else {
          SapUser.findByIdAndUpdate(sapUser._id, {name: name}, { new: true })
            .then((user) => {
              res.send( confirmUserUpdated(user) )
            })
        }
      })
  })

module.exports = router
