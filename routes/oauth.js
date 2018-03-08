const router = require('express').Router()
const request = require('superagent')
const { SlackWorkspace } = require('../models')

router
  .get('/api/oauth', (req, res, next) => {
    console.log("IN OAUTH")
    const options = (
      'https://slack.com/api/oauth.access?code=' +
        req.query.code +
        '&client_id=' + process.env.CLIENT_ID +
        '&client_secret=' + process.env.CLIENT_SECRET +
        '&redirect_uri=' + process.env.REDIRECT_URI
      )

    request
    .get(options)
    .then((response) => {
      console.log(Object.keys(response),"RESPONSE")
      var JSONresponse = JSON.parse(response.text)
      console.log(Object.keys(response,"RESPONSE ln22"))
      console.log(JSONresponse.ok,"JSONRESPONSE ln23")
      console.log(response.body,"JSONRESPONSE ln24")
      console.log(response.text,"JSONRESPONSE ln25")
      let body = response.body
      if (!JSONresponse.ok){
        res.send("Error encountered: \n"+JSON.stringify(JSONresponse))
      } else {
        SlackWorkspace.findOne({name:body.team_name})
        .then((resultSlack) => {
          if(!resultSlack){
            console.log("CREATE")
            SlackWorkspace.create({name:body.team_name,webHook:body.incoming_webhook.url}, (error, slack) => {
              if(error) { res.send(JSON.stringify(error)) }
              else { res.send(JSON.stringify(slack),'created slack')  }
            })
          } else {
            console.log("UPDATE")
            SlackWorkspace.findByIdAndUpdate(resultSlack._id,{webHook:body.incoming_webhook.url}, { new: true }, (error, slack) => {
              if(error) { res.send(JSON.stringify(error)) }
              else { res.send(JSON.stringify(slack),'updated slack')  }
            })
          }
        })
      }
    })
    .catch((err) => { res.send(err,"you broke it")})
  })

module.exports = router
