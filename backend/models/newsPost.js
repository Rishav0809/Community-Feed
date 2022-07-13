const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  likes: { type: Number },
  comments: { type: Array },
});
