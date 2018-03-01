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

module.exports = function(){
  platforms.map(platform=>{
    Platform.findOne({'name':platform.name},function(existingPlatform){
      console.log(existingPlatform,'EXISTING PLATFORM')
      if(!!existingPlatform){
        console.log('seed exists')
      }else{
        Platform.create(platform)
        .then((platform)=>{
          console.log('made platform')
        }).catch((err)=>{console.log(err)})
      }
    })
  })
}
