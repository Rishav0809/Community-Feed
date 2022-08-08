const express = require("express");
const {
  getAllPosts,
  createPost,
} = require("../controllers/community_controller");
const router = express.Router();

//get
router.get("/community", getAllPosts);

//post
router.post("/community/createpost/:id", createPost);

module.exports = router;
