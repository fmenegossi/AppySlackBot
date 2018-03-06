const router = require('express').Router()
const getStatus = require('../lib/getStatus')
const showApiList = require('../lib/showApiList')
const { displayApiList , messageToSlack , provideNameMess } = require('../lib/messages')
const isJson = require('../lib/jsonCheck')

router.post('/api/getstatus', (req, res, next) => {
  const option = req.body.text

  switch(option){
    case '':
      res.send( provideNameMess() )
      break
    case 'list':
      showApiList()
      .then((update) => {
        console.log(update,'UPDATE')
        res.send( displayApiList(update))
      })
    break

    default:
      if(isJson(option)){
        getStatus(option)
        .then((update) => {
          res.send( messageToSlack(update) )
        })
      } else {
        res.send(provideNameMess())
      }
  }

})
module.exports = router
