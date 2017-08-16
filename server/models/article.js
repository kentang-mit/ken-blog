const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  created: String,
  lastModified: String,
  content: String,
  abstract: String,
  tagList: [{
  	type: Schema.Types.ObjectId,
  	ref: 'tag',
  }],
  category: String
})

module.exports = mongoose.model('article', articleSchema);