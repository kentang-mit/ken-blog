const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
  tagName: String,
  created: String,
  lastModified: String
})

module.exports = mongoose.model('tag', tagSchema);