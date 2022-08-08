const { text } = require("body-parser");
const comments = require("../models/comments");
const communityPost = require("../models/communityPost");
const User = require("../models/user");

exports.getAllPosts = async (req, res, next) => {
  communityPost
    .find()
    .populate("user")
    .populate("comments")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "No Posts Exists" });
      }
      comments
        .find()
        .populate("user")
        .populate("post")
        .exec((err, comments) => {
          if (err) {
            console.log(err);
            return res.status(404).json({ message: "No comments Exists" });
          }
        });
      return res.status(200).send({ posts });
    });
};

//create post on community page
exports.createPost = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  const { title, text } = req.body;
  const post = new communityPost({
    title,
    text,
  });
  try {
    await post.save();
  } catch (err) {
    console.log(err);
  }

  const userRelated = await User.findOne({ _id: id });
  userRelated.posts.push(post);
  post.user.push(userRelated);
  try {
    await userRelated.save();
    await post.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ post });
};
