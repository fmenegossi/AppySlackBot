const mongoose = require('../config/database')
const { Schema } = mongoose

const apiSchema = new Schema({
  changed_at: { type: Date, required: true },
  changed_by: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: String },
  name: { type: String, required: true },
  platformName: { type: String, required: true },
  state: { type: String }
})

module.exports = mongoose.model('apis', apiSchema)
