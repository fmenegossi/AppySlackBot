const mongoose = require('../config/database')
const { Schema } = mongoose

const slackSchema = new Schema({
  name: { type: String, required: true, unique: true },
  webHook: { type: String, required: true }
})

module.exports = mongoose.model('platforms', slackSchema)
