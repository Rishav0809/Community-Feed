const Comment = require("../models/comments");
const Post = require("../models/communityPost");
const User = require("../models/user");

exports.createComment = async (req, res, next) => {
  const postid = req.params.postid;
  const userid = req.params.userid;
  const userRelated = await User.findOne({ _id: userid });

  const comment = new Comment({
    text: req.body.comment,
    username: userRelated.name,
  });

  try {
    await comment.save();
    console.log(comment);
  } catch (err) {
    console.log(err);
  }

  const postRelated = await Post.findOne({ _id: postid });

  postRelated.comments.push(comment);
  comment.post.push(postRelated);
  comment.user.push(userRelated);
  try {
    await postRelated.save();
    await comment.save();
    res.redirect("/community");
  } catch (err) {
    console.log(err);
  }
};
