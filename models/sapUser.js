const mongoose = require('../config/database')
const { Schema } = mongoose

const sapUserSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
})

module.exports = mongoose.model('sapUsers', sapUserSchema)
