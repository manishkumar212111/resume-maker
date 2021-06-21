const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const createProduct = catchAsync(async (req, res) => {
  let basic_info = await productService.getuserInfo(req.user.id);
  const product = await productService.createProduct(req.body, req.user , basic_info._id);
  res.send({
    product : product,
    basic_info : basic_info
  });
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  
    res.send(result);


});

const getProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  let basic_info = await productService.getuserInfo(req.user && req.user.id ? req.user.id : product.user);
  res.send({
    product : product,
    basic_info : basic_info
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.send({ status : true });
});

const getProductsByUser = catchAsync(async (req, res) => {
  res.send(await productService.getProductsByUser(req.params.userId ? req.params.userId : req.user.id));
  // let basic_info = await productService.getuserInfo(req.user.id);
  // res.send({
  //   resume_detail : resumes,
  //   basic_info : basic_info
  // });
});

const addUserInfo = catchAsync(async (req, res) => {
  let resumes = await productService.addUserInfo(req.body , req.params.userId ? req.params.userId : req.user.id);
  res.send(resumes);

});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
  addUserInfo
};
