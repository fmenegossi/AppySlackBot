const SLASH_TOKEN = require('../config/config')

module.exports = (req) => {
  if (req.body.token) {
    SLASH_TOKEN === req.body.token 
    next(req.body)
  } else {
    return null
  }
}
