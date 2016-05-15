const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  title: String,
  publishDate: Date,
  siteURL: String,
  repoURL: String,
  thumbnailURL: String,
  categories: [String]
});

module.exports = mongoose.model('Project', projectSchema);
