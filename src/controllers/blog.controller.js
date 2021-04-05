const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).send(blog);
});

const getBlogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await blogService.queryBlogs(filter, options);
  
    res.send(result);


});

const getBlog = catchAsync(async (req, res) => {
  let blog = await blogService.getBlogById(req.params.blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

    res.send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlogById(req.params.blogId, req.body);
  res.send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId);
  res.send({ status : true });
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
