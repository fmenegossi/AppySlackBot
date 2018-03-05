const { Platform, Api } = require('../models')
const { getApis } = require('../lib/getData')
const Promise = require('promise')


const showApiList = () => {
  console.log('./lib/showApiList')
  return new Promise((resolve, reject) => {
    Api.find()
      .select('name platformName -_id')
      .sort({ platformName: 'desc' })
      .then((apisFound) => {
        resolve(
          apisFound.map((api) => {
            return `${api.platformName} -> ${api.name}\n`
          })
        )
      })
      .catch((err) => console.log(err))
  })
}

module.exports = showApiList
