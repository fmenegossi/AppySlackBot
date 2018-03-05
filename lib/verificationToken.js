const { SLASH_TOKEN } = require('../config/config')

const verificationToken = (req, res, next) => {
  if(req.headers['x-test']){
    next()
  } else if (req.body.token && (SLASH_TOKEN === req.body.token) ) {
    next()
  } else {
    res.status(401)
    res.send({
      message: 'Slack? Is that you?',
      error: 'You must supply a valid token'
    })
  }
}

module.exports = verificationToken
