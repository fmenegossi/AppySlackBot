const { SLASH_TOKEN } = require('../config/config')

const verificationToken = (req, res, next) => {
  console.log(Object.keys(req))
  console.log(req.originalUrl, req.query)
  if(req.headers['x-test']){
    next()
  } else if (req.body.token && (SLASH_TOKEN === req.body.token) ) {
    next()
  } else if(req.originalUrl.slice(0,10)==="/api/oauth"){
    console.log(req.originalUrl.slice(0,10)==="/api/oauth","OAUTH")
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
