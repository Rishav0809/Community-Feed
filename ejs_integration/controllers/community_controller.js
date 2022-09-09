const { text } = require("body-parser");
const comments = require("../models/comments");
const communityPost = require("../models/communityPost");
const User = require("../models/user");

exports.getAllPosts = async (req, res, next) => {
  communityPost
    .find()
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
        .sort({ date: -1 })
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
};

exports.updatePost = async (req, res) => {
  try {
    const post = await communityPost.findOne({
      _id: req.params.postid,
    });
    const userRelated = await User.findOne({ _id: req.params.userid });

    if (!post) {
      return res.status(404).send();
    }

    if (!userRelated.likedPosts.find((o) => o._id.equals(req.params.postid))) {
      post.likes++;
      userRelated.likedPosts.push(post);
      await userRelated.save();
      await post.save();
    }
    else{
      post.likes--;
      userRelated.likedPosts.pop(post);
      await userRelated.save();
      await post.save();
    }

    res.redirect("/community");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
