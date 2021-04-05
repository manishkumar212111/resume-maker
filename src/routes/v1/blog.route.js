const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const BlogValidation = require('../../validations/blog.validation');
const BlogController = require('../../controllers/blog.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageBlogs'), validate(BlogValidation.createBlog), BlogController.createBlog)
  .get(auth('getBlogs'), validate(BlogValidation.getBlogs), BlogController.getBlogs);

router
  .route('/:blogId')
  .get(auth('getBlogs'), validate(BlogValidation.getBlog), BlogController.getBlog)
  .patch(auth('manageBlogs'), validate(BlogValidation.updateBlog), BlogController.updateBlog)
  .delete(auth('manageBlogs'), validate(BlogValidation.deleteBlog), BlogController.deleteBlog);

module.exports = router;
