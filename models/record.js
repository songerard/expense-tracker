const mongoose = require('mongoose')
const category = require('./category')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')
const db = require('../config/mongoose')
autoIncrement.initialize(db)

// set record schema
const RecordSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  }
},
  {
    // set virtuals include toObject()
    toObject: { virtuals: true }
  })

// get user display name and category name through populate virtuals
RecordSchema.virtual('userDisplayName', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true
})

RecordSchema.virtual('categoryName', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: 'id',
  justOne: true
})

RecordSchema.plugin(autoIncrement.plugin, {
  model: 'Record',
  field: 'id',
  startAt: 1
})
module.exports = mongoose.model('Record', RecordSchema)