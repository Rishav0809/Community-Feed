const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: String,
      required: false,
    },

    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
