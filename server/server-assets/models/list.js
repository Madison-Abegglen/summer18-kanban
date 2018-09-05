const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true,
    default: Date.now()
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  }
})

module.exports = mongoose.model('List', schema)