const mongoose = require('mongoose')
const { Schema } = mongoose

const comment = new Schema({
  content: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true,
    default: Date.now()
  }
})

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    required: true,
    default: Date.now()
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  comments: [comment]
})

module.exports = mongoose.model('Task', schema)