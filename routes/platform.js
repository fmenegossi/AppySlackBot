const router = require('express').Router()
const { Platform } = require('../models')

router
  .post('/api/platforms', (req, res, next) => {
    const data = req.body.text

    console.log(data.name)

    if(!data) {
      const err = new Error('Data not found!')
      err.status = 404
      next(err)
    }

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
  })

module.exports = router
