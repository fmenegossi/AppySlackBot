const { Platform, Api } = require('../models')
const { getApis } = require('../lib/getData')
const Promise = require('promise')


const showApiList = () => {
  return new Promise((resolve, reject) => {
    Api.find()
      .select('name platformName -_id')
      .sort({ platformName: 'desc' })
      .then((apisFound) => {
        resolve(
          apisFound.map((api) => {
            return `${api.platformName} --> ${api.name}`
          }).join('\n')
        )
      })
  })
}

module.exports = showApiList
