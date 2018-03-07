const router = require('express').Router()
const SapUser = require('../models/sapUser')
const { generalMsg } = require('../lib/messages.js')

router
  .post('/api/sapuser', (req, res, next) => {

    console.log('sapuser')
    const checkText = (body) => {
      if (body.text === '' || body.text === undefined) {

        fetchList()
        return
      }else{

        let [code, name] = body.text.split(':')

        if(!name || !code) {
          const err = new Error('User and/or Code not present!')
          res.send( generalMsg( { "msg" : "nameOrCodeNotPresent" } ) )
        } else {
          console.log(code, name)
          checkUser(code, name)
        }
      }

    }


    const fetchList = () => {
      SapUser.find()
      .then((users) => {
        res.send( generalMsg({"msg" : "fetchUserList" , "data" : users } ) )
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
          res.send( generalMsg({"msg" : "confirmUserCreated" , "data" : user } ) )
        })
      }

      const updateUser = (code, name, sapUser ) => {
        SapUser.findByIdAndUpdate(sapUser._id, {name: name}, { new: true })
          .then((user) => {
            res.send( generalMsg({"msg" : "confirmUserUpdated" , "data" : user } ) )
        })
      }
      checkText(req.body)
  })

module.exports = router
