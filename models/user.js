const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('users', userSchema)
