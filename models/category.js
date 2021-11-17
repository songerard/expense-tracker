const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')
const db = require('../config/mongoose')
autoIncrement.initialize(db)

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

CategorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'id',
  startAt: 1
})
module.exports = mongoose.model('Category', CategorySchema)