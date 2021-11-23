const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedArticles` array in User.js
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author:
  [
    {
      type: String,
    }
  ],
  description: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
});

module.exports = articleSchema;