const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
      required: true,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: "Comment",
      $sort: { date: -1 },
    },
  ],
});

postSchema.virtual("url").get(function () {
  return "/post/" + this._id;
});

module.exports = mongoose.model("Post", postSchema);
