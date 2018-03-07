const router = require('express').Router()
const request = require('superagent')

router
  .get('/api/oauth', (req, res, next) => {
    console.log("IN OAUTH")
    console.log(req.query,"QUERY")
    console.log(req,"REQ")
    let options = {
      uri: 'https://slack.com/api/oauth.access?code=' +
        req.query.code +
        '&client_id=' + process.env.CLIENT_ID +
        '&client_secret=' + process.env.CLIENT_SECRET +
        '&redirect_uri=' + process.env.REDIRECT_URI,
      method: 'GET'
    }
    console.log(options,"OPTIONS")
    request(options, (error, response, body) => {
      console.log(body,"BODY")
      console.log(response,"RESPONSE")

      var JSONresponse = JSON.parse(body)
      if (!JSONresponse.ok){
        console.log(JSONresponse,"JSONRESPONSE ln19")
        res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
      } else {
        console.log(JSONresponse,"JSONRESPONSE ln22")
        res.send("Success!")
      }
    })
  })

module.exports = router
