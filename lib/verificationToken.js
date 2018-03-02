const SLASH_TOKEN = require('../config/config')
module.exports = (req) => {
  if (req.body.token && SLASH_TOKEN === req.body.token ) {
    console.log('token is there')
    next(req.body)
  } else {
    return null
  }
}
