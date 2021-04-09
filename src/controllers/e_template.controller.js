const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { e_templateService, emailService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const createE_template = catchAsync(async (req, res) => {
  const e_template = await e_templateService.createE_template(req.body);
  res.status(httpStatus.CREATED).send(e_template);
});

const getE_templates = catchAsync(async (req, res) => {
  
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await e_templateService.queryE_templates(filter, options);
  res.send(result);


});

const getE_template = catchAsync(async (req, res) => {
  let e_template = await e_templateService.getE_templateById(req.params.e_templateId);
  if (!e_template) {
    throw new ApiError(httpStatus.NOT_FOUND, 'E_template not found');
  }

    res.send(e_template);
});

const updateE_template = catchAsync(async (req, res) => {
  const e_template = await e_templateService.updateE_templateById(req.params.e_templateId, req.body);
  res.send(e_template);
});

const deleteE_template = catchAsync(async (req, res) => {
  await e_templateService.deleteE_templateById(req.params.e_templateId);
  res.send({ status : true });
});

module.exports = {
  createE_template,
  getE_templates,
  getE_template,
  updateE_template,
  deleteE_template,
};
