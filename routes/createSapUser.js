const router = require('express').Router()
const SapUser = require('../models/sapUser')

router
  .post('/api/sapuser', (req, res, next) => {
    const data = req.body.text
    let [code, name] = data.split(':')

    code = code.trim()
    name = name.trim()

    console.log(code, name)
    console.log('hsdfjkhskdfjhksdhfksdkjfkshdkfhsdhfkshjk')


    if(!name || !code) {
      const err = new Error('User/Code not existent!')
      next(err)
    }

    SapUser.find({code: code})
      .then((sapUser) => {
        console.log(sapUser)

        if(!!sapUser) {
          console.log('dont got fucking guy')
          const newSapUser = new SapUser({name: name, code: code})
          newSapUser.save((error) => {
            const err = new Error(error)
            next(err)
          })
        } else {
          console.log('got the fucking guy')

          findByIdAndUpdate(sapUser._id, {name: name}, { new: true })
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

        res.send({error: 'not updated/inserted'})
      })
  })

module.exports = router
