const router = require('express').Router()
const SapUser = require('../models/sapUser')
const { confirmUserCreated , confirmUserUpdated, fetchUserList } = require('../lib/messages.js')

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
      SapUser.find()
        .then((users) => {
          res.send(fetchUserList(users))
        })
    }

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
