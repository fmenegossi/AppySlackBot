const {Platform} = require('../models')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD
const config = require('../config/config')

const tokenUrl = config.TOKEN_URL
const dataUrl = config.DATA_URL

const platforms = [{
  name:'Cloud Apis',
  url:tokenUrl,
  username:username,
  password:password
}]

const seedPlatforms = () => {
  platforms.map(platform => {
    Platform.findOne({name: platform.name})
      .then((foundPlatform) => {
        console.log(!foundPlatform,'EXISTING PLATFORM')
        if(!foundPlatform) {
          Platform.create(platform)
          .then((platform) => {
            console.log('made platform')
            
          })
          .catch((err) => {console.log(err)})
        } else {
          console.log('seed exists')
        }
      })
      .catch((err) => {console.log(err)})
  })
}

module.exports = seedPlatforms
