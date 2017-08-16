const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: String,
  created: String,
  lastModified: String
})

module.exports = mongoose.model('category', categorySchema);