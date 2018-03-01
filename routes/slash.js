const router = require('express').Router()
const getStatus = require('../lib/getStatus')
const showApiList = require('../lib/showApiList')

router.post('/api/getstatus', (req, res, next) => {
  if(!req.body.text){res.send({text:'no text field found'})}
  let option = req.body.text.trim()
  switch(option){
    case '':
      res.send({text:'Y U NO FILL IN NAME?'})
      break
    case 'list':
      showApiList(option)
      .then(function(update){
      res.send({text:update})
      })
      break

    default:
      getStatus(option)
      .then(function(update){
        res.send({text:update})
      })
  }
})
module.exports = router
