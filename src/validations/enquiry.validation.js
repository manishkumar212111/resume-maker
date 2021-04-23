const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createEnquiry = {
  body: Joi.object().keys({
    name: Joi.string(),
    message: Joi.string().required(),
    email: Joi.string().required(),
    subject : Joi.string(),
    status: Joi.string(),     
  }),
};

const getEnquirys = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEnquiry = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    enquiryId: Joi.string().custom(objectId),
  }),
};

const updateEnquiry = {
  params: Joi.object().keys({
    enquiryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        message: Joi.string(),
      subject : Joi.string(),
        email: Joi.string(),
        status: Joi.string(),
    })
    .min(1),
};

const deleteEnquiry = {
  params: Joi.object().keys({
    EnquiryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEnquiry,
  getEnquirys,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry
};
