const Comment = require("../models/comments");
const Post = require("../models/communityPost");
const User = require("../models/user");

exports.createComment = async (req, res, next) => {
  console.log("This is the result of req.params");
  console.log(req.params);
  const postid = req.params.postid;
  const userid = req.params.userid;
  const userRelated = await User.findOne({ _id: userid });

  const comment = new Comment({
    text: req.body.comment,
    username: userRelated.name,
  });

  try {
    await comment.save();
  } catch (err) {
    console.log(err);
  }

  const postRelated = await Post.findOne({ _id: `${postid}` });
  console.log(postRelated);

  postRelated.comments.push(comment);
  comment.post.push(postRelated);
  comment.user.push(userRelated);
  try {
    await postRelated.save();
    await comment.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ postRelated });
};
