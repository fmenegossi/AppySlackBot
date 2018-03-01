module.exports = (api,platformName) => {
  return {
    name:api.name,
    changed_at:new Date(parseInt(api.life_cycle.changed_at.slice(6,-2))),
    changed_by:api.life_cycle.changed_by,
    created_at:new Date(parseInt(api.life_cycle.created_at.slice(6,-2))),
    created_by:api.life_cycle.created_by,
    state:api.state,
    platformName:platformName
  }
}
