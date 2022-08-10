const express = require("express");
const {
  getAllPosts,
  createPost,
} = require("../controllers/community_controller");
const router = express.Router();

//get
router.get("/", getAllPosts);

//post
router.post("/createpost/:id", createPost);

module.exports = router;
