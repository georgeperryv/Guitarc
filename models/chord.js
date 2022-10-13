const mongoose = require('mongoose')
require('./song')

const Schema = mongoose.Schema

const chordSchema = new Schema(
  {
    name: { type: String, required: true },
    chordImage: { type: String },
    song: { type: String },
    learned: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Chord', chordSchema)
