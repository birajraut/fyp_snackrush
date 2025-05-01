const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { blogDetails, blogList, createBlog, updateBlog } = require('../controller/blog.controller');
const upload = require('../middleware/uploader');

router.route('/blog')
    .get(blogList)

router.route('/blog/:id')
    .get(blogDetails)
    .put(authMiddleware, updateBlog)

router.route('/blog')
    .post(authMiddleware, upload.single('image'),  createBlog)

module.exports = router;
