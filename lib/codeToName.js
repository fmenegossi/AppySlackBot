const { SapUser } = require('../models')
const Promise = require('promise')

module.exports = (code) => {
  console.log('./lib/codeToName:')
  console.log(code)
  return new Promise((resolve,reject) => {
    SapUser.findOne({ code: code })
    .then((sapUser) => {
      if(!sapUser) {
        console.log(`ln11: sapUser ${sapUser}`)
        resolve(code)
      } else {
        console.log('name', sapUser.name)
        resolve(sapUser.name)
      }
    })
    .catch((err) => { console.log('error', err) })
  })
}
