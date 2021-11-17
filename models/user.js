const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')
const db = require('../config/mongoose')
autoIncrement.initialize(db)

// Set userSchema
const UserSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  loginName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1
})
module.exports = mongoose.model('User', UserSchema)