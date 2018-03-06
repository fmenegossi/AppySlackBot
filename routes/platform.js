const router = require('express').Router()
const { Platform } = require('../models')
const { properPlatformFormat } = require('../lib/messages')
const isJson = require('../lib/jsonCheck')


router
  .post('/api/platforms', (req, res, next) => {

    const checkBody = (text) => {
      if ((!text) || !isJson(text)) {
        res.send(properPlatformFormat())
      } else {
        const data = JSON.parse(text)
        checkFormat(data)
      }
    }

    const checkFormat = (data) => {
      if (!data.name || !data.url || !data.username || !data.password) {
        res.send(properPlatformFormat())
      } else {
        findPlatform(data)
      }
    }

    const findPlatform = (data) => {
      Platform.findOne({
          name: data.name
        })
        .then((platform) => {
          if (!platform) {
            createPlatform(data)
          } else {
            updatePlatform(platform, data)
          }
        })
    }

    const createPlatform = (data) => {
      const newPlatform = {
        name: data.name,
        url: data.url,
        username: data.username,
        password: data.password
      }

      Platform.create(newPlatform, (error, platform) => {
        if (error) {
          next(error)
        }
        res.send(platform)
      })
    }

    const updatePlatform = (platform, data) => {
      const platformUpdates = {
        url: data.url,
        username: data.username,
        password: data.password
      }

      const patchedPlatform = { ...platform,
        ...platformUpdates
      }

      Platform.findByIdAndUpdate(platform._id, {
          patchedPlatform
        }, {
          new: true
        })
        .then((platform) => {
          res.send(platform)
        })
    }

    checkBody(req.body.text)
  })

module.exports = router
