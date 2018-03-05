const { Platform, Api } = require('../models')
const { getApis } = require('../lib/getData')
const Promise = require('promise')


const showApiList = () => {
  return new Promise((resolve, reject) => {
    Api.find()
      .select('name platformName -_id')
      .sort({ platformName: 'desc' })
      .then((apisFound) => {
        let platformName = ''

        resolve(
          apisFound.map((api, index) => {
            if(platformName !== api.platformName){
              platformName = api.platformName
              return `\n - Platform ${platformName}:\n-- ${api.name}\n`
            } else {
              return ` -- ${api.name}\n`
            }
          }).join('')
        )
      })
      .catch((err) => console.log(err))
  })
}

module.exports = showApiList
