const Comment = require("../models/comments");
const Post = require("../models/communityPost");
const User = require("../models/user");

exports.createComment = async (req, res, next) => {
  const userRelated = await User.findOne({ _id: req.params.userid });

  const comment = new Comment({
    text: req.body.comment,
    username: userRelated.name,
    userdp: userRelated.photo,
  });

  try {
    await comment.save();
    console.log(comment);
  } catch (err) {
    console.log(err);
  }

  const postRelated = await Post.findOne({ _id: req.params.postid });

  postRelated.comments.push(comment._id);

  comment.post.push(postRelated._id);
  comment.user.push(userRelated);
  console.log(comment.user[0].photo);
  try {
    await postRelated.save();
    await comment.save();
    res.redirect("/community");
  } catch (err) {
    console.log(err);
  }
};
