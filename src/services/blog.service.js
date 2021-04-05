const httpStatus = require('http-status');
const { Blog , User } = require('../models');
const Moment = require('moment')
const ApiError = require('../utils/ApiError');
const { sendOTP  } = require('../services/email.service');
const { userService } = require('../services')
var mongoose = require('mongoose');


/**
 * Create a blog
 * @param {Object} blogBody
 * @returns {Promise<Blog>}
 */
const createBlog = async (blogBody) => {
  
  const blog = await Blog.create({ ...blogBody });
  return blog;
};

/**
 * Query for blogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBlogs = async (filter, options) => {
    return await Blog.paginate(filter, options , async (option) => {
        return await Blog.find(option.filter).populate('user', { email: 1 })
        .populate('planId', { name: 1 }).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const blogs = await Blog.paginate(filter, options);
//   return blogs;
};

/**
 * Get blog by id
 * @param {ObjectId} id
 * @returns {Promise<Blog>}
 */
const getBlogById = async (id) => {
  return await Blog.findById(id);
};

/**
 * Update blog by id
 * @param {ObjectId} blogId
 * @param {Object} updateBody
 * @returns {Promise<Blog>}
 */
const updateBlogById = async (blogId, updateBody) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  if (updateBody.email && (await Blog.isEmailTaken(updateBody.email, blogId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(blog, updateBody);
  await blog.save();
  return blog;
};

/**
 * Delete blog by id
 * @param {ObjectId} blogId
 * @returns {Promise<Blog>}
 */
const deleteBlogById = async (blogId) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  await blog.remove();
  return blog;
};

module.exports = {
  createBlog,
  queryBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
