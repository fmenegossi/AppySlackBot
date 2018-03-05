const router = require('express').Router()
const SapUser = require('../models/sapUser')
const { confirmUserCreated , confirmUserUpdated, fetchUserList } = require('../lib/messages.js')

router
  .post('/api/sapuser', (req, res, next) => {

    const checkBody = (data) => {
      if (data.text===undefined) {
        const err = new Error('Please provide a text key')
        err.status = 422
        next(err)
      } else {
        checkText(data.text)
      }
    }

    const checkText = (text) => {
      let [code, name] = text.split(':')
      if (!text) {
        fetchList()
      } else if(!name || !code) {
        const err = new Error('User and/or Code not present!')
        res.send('User and/or Code not present!')
      } else {
        console.log(code, name)
        checkUser(code, name)
      }
    }


    const fetchList = () => {
      SapUser.find()
      .then((users) => {
        res.send(fetchUserList(users))
      })
    }

    const checkUser = (code, name) => {
      code = code.trim()
      name = name.trim()

      SapUser.findOne({code: code})
        .then((sapUser) => {
          if(!sapUser) {
            createUser(code, name)
          } else {
            updateUser(code, name, sapUser)
          }
        })
      }

      const createUser = (code, name ) => {
        SapUser.create({name: name, code: code}, (error, user) => {
          if(error) { next(error) }
          res.send( confirmUserCreated(user) )
        })
      }

      const updateUser = (code, name, sapUser ) => {
        SapUser.findByIdAndUpdate(sapUser._id, {name: name}, { new: true })
          .then((user) => {
            res.send( confirmUserUpdated(user) )
        })
      }
      checkBody(req.body)
  })

module.exports = router
