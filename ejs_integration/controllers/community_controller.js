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
            return res.status(404).json({ message: "No posts found" });
          }
        });

      return res.status(200).render("community", {
        title: "Community Feed",
        posts,
        user: req.user,
      });
    });
};

// create post on community page

exports.createPost = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  const { text } = req.body;
  const post = new communityPost({
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
    res.redirect("/community");
  } catch (err) {
    console.log(err);
  }
  console.log(post.user);
};
