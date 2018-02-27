const mongoose = require('../config/database')
const { Schema } = mongoose

const metadataSchema = new Schema({
  id:     { type: String },
  uri:    { type: String },
  type:   { type: String }
})

const resultSchema = new Schema({
  changed_at:   { type: Date, required: true },
  changed_by:   { type: String, required: true },
  created_at:   { type: Date, default: Date.now },
  created_by:   { type: String },
  name:         { type: String, required: true },
  state:        { type: String }
})

module.exports = mongoose.model('results', resultSchema)
