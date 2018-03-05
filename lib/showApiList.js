const { Platform, Api } = require('../models')
const { getApis } = require('../lib/getData')
const Promise = require('promise')


const showApiList = () => {
  return new Promise((resolve, reject) => {
    Api.find()
      .select('name platformName -_id')
      .sort({ platformName: 'desc' })
      .then((apisFound) => {
        let platform = ''

        resolve(
          apisFound.map((api) => {
            let line = ''

            if(platform !== api.platformName){
              platform = api.platformName
              line += `\n - Platform ${platform}:\n`
            }

            line += ` -- ${api.name}\n`

            return line
          })
        )
      })
  })
}

module.exports = showApiList
