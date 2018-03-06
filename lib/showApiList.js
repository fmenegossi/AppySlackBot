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
        let platformName = ''

        resolve(
          apisFound.map((api) => {
            let line = ''

            if(platformName !== api.platformName){
              platformName = api.platformName
              line = `\n - Platform ${platformName}:\n`
            }

            return `${line} -- ${api.name}\n`
          }).join('')
        )
      })
      .catch((err) => console.log(err))
  })
}

module.exports = showApiList
