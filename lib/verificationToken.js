const { SLASH_TOKEN } = require('../config/config')

const verificationToken = (req, res, next) => {
  console.log(req.body.token)

  if (req.body.token && (SLASH_TOKEN === req.body.token) ) {
    next()
  } else {
    res.status(401)
    res.send({
      message: 'You must supply a valid token',
      error: 'Slack? Is that you?'
    })
  }
}

module.exports = verificationToken
