const router = require('express').Router()
const getStatus = require('../lib/getStatus')
const showApiList = require('../lib/showApiList')
const { diplayApiList , messageToSlack , provideNameMess} = require('../lib/messages')

router.post('/api/getstatus', (req, res, next) => {
  // if(!req.body.text){res.send({text:'no text field found'})}
  let option = req.body.text.trim()

  switch(option){
    case '':
      res.send( provideNameMess() )
      break
    case 'list':
      showApiList(option)
      .then(function(update){
        res.send( displayApiList(update))
      })
      break

    default:
      getStatus(option)
      .then(function(update){
        res.send( messageToSlack(update) )
      })
  }
})
module.exports = router
