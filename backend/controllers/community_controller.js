const communityPost = require('../models/communityPost');
const User = require('../models/user');

//get all poston community page
exports.getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await communityPost.find().populate('user');
  } catch (err) {
    console.log(err);
  }
  if (!posts) {
    return res.status(404).json({ message: 'No posts found' });
  }
  return res.status(200).render('community', { posts: posts });
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
  console.log(userRelated);
  userRelated.posts.push(post);
  try {
    await userRelated.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ post });
};
