const Comment = require('../models/comments');
const Post = require('../models/communityPost');

exports.createComment = async (req, res, next) => {
  const id = req.params.id;

  const comment = new Comment({
    text: req.body.comment,
    post: id,
  });
  try {
    await comment.save();
  } catch (err) {
    console.log(err);
  }

  const postRelated = await Post.findOne({ id });
  postRelated.comments.push(comment);
  try {
    await postRelated.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ postRelated });
};
