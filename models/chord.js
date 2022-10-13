const mongoose = require('mongoose')
require('./song')

const Schema = mongoose.Schema

const chordSchema = new Schema(
  {
    name: { type: String, required: true },
    song: { type: Schema.Types.ObjectId, ref: 'Song' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Chord', chordSchema)
