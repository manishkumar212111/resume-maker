const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
        type: String,
        required: true,
        index: true,
    },
    shortDescription : {
      type: String,
      default : ''
    },
    metaDescription: {
        type: String,
        required: true,
        index: true,
    },
    status: {
      type: Boolean,
      default : true
    },
    thumbnail_url: {
      type: String,
      default : ''
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);


/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
