const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set category schema
const CategorySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', CategorySchema)