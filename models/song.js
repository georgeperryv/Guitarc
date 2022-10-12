const mongoose = require('mongoose')
require('./category')

const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    song: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Song', songSchema)
