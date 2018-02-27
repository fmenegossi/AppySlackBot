const seed = require('../db/seed.json')
const {Api} = require('../models')

let reworkedSeed = seed.d.results.map(api => {
  var object = {}
  object.name = api.name
  object.changed_at = new Date(parseInt(api.life_cycle.changed_at.slice(6,-2)))
  object.changed_by = api.life_cycle.changed_by
  object.created_at = new Date(parseInt(api.life_cycle.created_at.slice(6,-2)))
  object.created_by = api.life_cycle.created_by
  object.state = api.state
  return object
})
console.log('reworkedSeed',reworkedSeed)
reworkedSeed.map(api =>{
  Api.create({
    name:api.name,created_at:api.created_at,created_by:api.created_by,changed_at:api.changed_at,changed_by:api.changed_by
    }
  ).then((api)=>{
    console.log(api)
  }).catch((err)=>{console.log(err)})
})
