const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  created: {
    type: Number,
    required: true,
    default: Date.now()
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Board', schema)
