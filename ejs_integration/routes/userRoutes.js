const express = require("express");
const { getAllPosts, deletePost } = require("../controllers/user_controller");
const { ensureAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/", ensureAuthenticated, getAllPosts);

router.get("/delete/:postid/:userid", ensureAuthenticated, deletePost);

module.exports = router;
