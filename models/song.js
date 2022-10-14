const mongoose = require('mongoose')
require('./category')
require('./chord')

const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    song: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    chord: [{ type: Schema.Types.ObjectId, ref: 'Chord' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Song', songSchema)
