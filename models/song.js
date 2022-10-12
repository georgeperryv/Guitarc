const mongoose = require('mongoose')
require('./category')

const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    timestamps: true
  }
)

module.exports = songSchema
