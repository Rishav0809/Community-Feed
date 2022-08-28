const { text } = require("body-parser");
const comments = require("../models/comments");
const communityPost = require("../models/communityPost");
const User = require("../models/user");

exports.getAllPosts = async (req, res, next) => {
  communityPost
    .find({ user: req.user.id })
    .sort({ date: -1 })
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

      return res.status(200).render("profile", {
        title: "My Profile",
        posts,
        user: req.user,
      });
    });
};

exports.deletePost = async (req, res) => {
  try {
    const postid = req.params.postid;

    const post = await communityPost.findOneAndDelete({
      _id: postid,
      user: req.params.userid,
    });
    console.log(post);
    const userRelated = await User.findOne({ _id: req.params.userid });
    const indexOfObject = userRelated.posts.findIndex((object) => {
      return object.equals(req.params.postid);
    });

    userRelated.posts.splice(indexOfObject, 1);
    await userRelated.save();
    console.log();

    if (!post) {
      return res.status(404).send({ message: "No such posts exist" });
    }

    res.redirect("/profile");
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "any post" });
  }
};
