const express = require("express");
const {
  getAllPosts,
  createPost,
} = require("../controllers/community_controller");
const { ensureAuthenticated } = require("../middleware/auth");
const router = express.Router();

//get
router.get("/", ensureAuthenticated, getAllPosts);

//post
router.post("/createpost/:id", ensureAuthenticated, createPost);

module.exports = router;
