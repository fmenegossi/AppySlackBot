const router = require('express').Router()
const SapUser = require('../models/sapUser')
const { confirmUserCreated , confirmUserUpdated, fetchUserList } = require('../lib/messages.js')

router
  .post('/api/sapuser', (req, res, next) => {


    const data = req.body.text
    console.log(data)
    if (data === undefined){
      const err = new Error('Please provide a text key')
      err.status = 422
      next(err)
    }
    let [code, name] = data.split(':')
    if(!req.body.text) {
      SapUser.find()
      .then((users) => {
        res.send(fetchUserList(users))
      })
    }
    else if(!name || !code) {
      const err = new Error('User and/or Code not present!')
      res.send('User and/or Code not present!')
    }  else {
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
      })}
  })

module.exports = router
