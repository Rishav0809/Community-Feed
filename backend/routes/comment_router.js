const express = require('express');
const { createComment } = require('../controllers/comments_controller');
const router = express.Router();

//get

//post
router.post('/', createComment);

module.exports = router;
