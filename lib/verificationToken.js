const SLASH_TOKEN = require('../config/config')
// const sendToSlack = require('../lib/sendToSlack')

module.exports = (req) => {
  if (req.body.token) {
    SLASH_TOKEN === req.body.token
    next(req.body)
  } else {
    // sendToSlack('No token')
    return null
  }
}
