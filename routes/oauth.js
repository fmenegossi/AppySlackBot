const router = require('express').Router()
const request = require('superagent')

router
  .get('/api/oauth', (req, res, next) => {
    console.log("IN OAUTH")
    console.log(req.query,"QUERY")
    const options = (
      'https://slack.com/api/oauth.access?code=' +
        req.query.code +
        '&client_id=' + process.env.CLIENT_ID +
        '&client_secret=' + process.env.CLIENT_SECRET +
        '&redirect_uri=' + process.env.REDIRECT_URI
      )

    console.log(options,"OPTIONS")
    request
    .get(options)
    .then((response) => {
      console.log(Object.keys(response),"RESPONSE")
      var JSONresponse = JSON.parse(response.text)
      console.log(JSONresponse.ok,"JSONRESPONSE ln22")
      console.log(response.body,"JSONRESPONSE ln23")
      console.log(response.text,"JSONRESPONSE ln24")

      if (!JSONresponse.ok){
        res.send("Error encountered: \n"+JSON.stringify(JSONresponse))
      } else {
        console.log(JSONresponse,"JSONRESPONSE ln24")
        res.send("Success!")
      }
    })
    .catch((err) => { res.send(err,"you broke it")})
  })

module.exports = router
