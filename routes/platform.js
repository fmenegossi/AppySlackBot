const router = require('express').Router()
const { Platform } = require('../models')
const { properPlatformFormat } = require('../lib/messages')
router
  .post('/api/platforms', (req, res, next) => {
      console.log(typeof req.body.text)

    // const test = {"blaat":"bla"}
    // const data = JSON.parse(test)
    const requestBody = req.body.text

    if((!requestBody) ||
       (requestBody.slice(-1) !== '}' && requestBody.slice(0,1) !== '{')) {
      res.send(properPlatformFormat())
    } else {
      const data = JSON.parse(requestBody)
      
      if (!data.name || !data.url || !data.username || !data.password){
        res.send(properPlatformFormat())
      } else {
        Platform.findOne({ name: data.name })
        .then((platform) => {
          if(!platform) {
            const newPlatform = {
              name: data.name,
              url: data.url,
              username: data.username,
              password: data.password
            }

            Platform.create(newPlatform, (error, platform) => {
              if(error) { next(error) }
              res.send(platform)
            })
          } else {
            const platformUpdates = {
              url: data.url,
              username: data.username,
              password: data.password
            }

            const patchedPlatform = { ...platform, ...platformUpdates }

            Platform.findByIdAndUpdate(platform._id, { patchedPlatform }, { new: true })
              .then((platform) => {
                res.send(platform)
              })
          }
        })
      }
    }
  })

module.exports = router
