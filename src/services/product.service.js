const httpStatus = require('http-status');
const { Product , User } = require('../models');
const Moment = require('moment')
const ApiError = require('../utils/ApiError');
const { sendOTP  } = require('../services/email.service');
const { userService } = require('../services')
var mongoose = require('mongoose');


/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody , user) => {
  productBody.user = user.id;
  const existingProducts = await Product.find({ user : user.id, default: true});
  if(existingProducts && existingProducts.length){
    let checkExpire = await userService.getUserDetails(user.id);
    if(!checkExpire.expires){
      const product = await Product.create({ ...productBody});
      return product;
    } else {
      const product = await updateProductById(existingProducts[0].id, productBody);
      return product;      
    }
  } else {
    const product = await Product.create({ ...productBody, default: true });
    return product;
  }   
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
    return await Product.paginate(filter, options , async (option) => {
        return await Product.find(option.filter).populate('user', { email: 1 })
        .populate('planId', { name: 1 }).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const products = await Product.paginate(filter, options);
//   return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return await Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.email && (await Product.isEmailTaken(updateBody.email, productId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

const getProductsByUser = async (userId) => {
    let checkExpire = await userService.getUserDetails(userId);
    if(checkExpire.expires){
      const product = await Product.find({user : userId , default : true }).select('id updatedAt name template_id');
      return product;
    } else {
      const product = await Product.find({user : userId }).select('id updatedAt name template_id');
      return product;
    }
    
}

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByUser
};
