const mongoose = require('../config/database')
const { Schema } = mongoose

const platformSchema = new Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('platforms', platformSchema)
