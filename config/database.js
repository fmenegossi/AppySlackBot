const mongoose = require('mongoose')

// Use native promises
mongoose.Promise = global.Promise

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost/slackbot'
mongoose.set('debug', true)
mongoose.connect(MONGODB_URL)

// Monitor DB connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Successfully connected to MongoDB!')
})

module.exports = mongoose
