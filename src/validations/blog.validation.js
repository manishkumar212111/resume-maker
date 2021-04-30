const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    metaDescription: Joi.string().required(),
    status: Joi.boolean(),  
    thumbnail_url: Joi.string(),
    shortDescription: Joi.string()   
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        title: Joi.string(),
        content: Joi.string(),
        metaDescription: Joi.string(),
        status: Joi.boolean(),  
        thumbnail_url: Joi.string(),
        shortDescription: Joi.string()   
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    BlogId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};
