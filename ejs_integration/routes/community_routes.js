const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
} = require("../controllers/community_controller");
const { ensureAuthenticated } = require("../middleware/auth");
const router = express.Router();

//get
router.get("/", getAllPosts);

//post
router.post("/createpost/:id", ensureAuthenticated, createPost);

//
router.get("/post/:postid/:userid", ensureAuthenticated, updatePost);

module.exports = router;
