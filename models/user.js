const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Set userSchema
const UserSchema = new Schema({
  id: {
    type: Number,
    required: true
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

module.exports = mongoose.model('User', UserSchema)