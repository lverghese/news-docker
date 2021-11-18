const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const articleSchema = new Schema({
  author:
    {
      type: String,
    },
  description: {
    type: String,
    required: true,
  },
  // saved article id from GoogleNewsAPI
  articleId: {
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
  title: {
    type: String,
    required: true,
  },
});

module.exports = articleSchema;