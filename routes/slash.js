const router = require('express').Router()
const getStatus = require('../lib/getStatus')
const showApiList = require('../lib/showApiList')
const { generalMsg } = require('../lib/messages')
const isJson = require('../lib/jsonCheck')

router.post('/api/getstatus', (req, res, next) => {
  const option = req.body.text

  switch(option){
    case '':
      res.send( generalMsg({ "msg": "provideNameMess"}) )
      break
    case 'list':
      showApiList()
      .then((update) => {
        console.log(update,'UPDATE')
        res.send( generalMsg({"msg" : "displayApiList", "data" : update } ) )
      })
    break

    default:
      if(isJson(option)){
        getStatus(option)
        .then((update) => {
          res.send( generalMsg({"msg" : "showSingleApi", "data" : update } )  )
        })
      } else {
        res.send( generalMsg({ "msg": "provideNameMess"}) )
      }
  }

})
module.exports = router
