const mongoose = require('mongoose')
const { Schema } = mongoose

// bcrypt uses hashing and salt to obfiscate your password
const bcrypt = require('bcryptjs')
const SALT = 10

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  // every email must be unique on the database
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true,
    default: Date.now
  }
})

// THESE TWO METHODS CAN BE COPIED FOR ALL USER SCHEMA'S
// statics are used to create Model methods
schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

// schema.methods are used to add a method to a Model instance
schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', schema)
