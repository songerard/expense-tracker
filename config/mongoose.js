// require mongoose
const mongoose = require('mongoose')

// set connection
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error.')
})
db.once('open', () => {
  console.log('mongodb connected.')
})

// export connection
module.exports = db