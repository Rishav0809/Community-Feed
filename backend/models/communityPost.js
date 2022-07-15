const mongoose = require('mongoose');
const User = require('../models/user');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Comment',
      default: [],
    },
  ],
});

postSchema.virtual('url').get(function () {
  return '/post/' + this._id;
});

module.exports = mongoose.model('Post', postSchema);
