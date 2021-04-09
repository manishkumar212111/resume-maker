const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createE_template = {
  body: Joi.object().keys({
    type: Joi.string().required(),
    content: Joi.string().required(),
    subject: Joi.string().required(),
    dynamic_var: Joi.array()
  }),
};

const getE_templates = {
  query: Joi.object().keys({
    type : Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getE_template = {
  query: Joi.object().keys({
    type: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    e_templateId: Joi.string().custom(objectId),
  }),
};

const updateE_template = {
  params: Joi.object().keys({
    e_templateId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        type: Joi.string(),
        content: Joi.string(),
        subject: Joi.string(),
        dynamic_var: Joi.array()         
    })
    .min(1),
};

const deleteE_template = {
  params: Joi.object().keys({
    E_templateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createE_template,
  getE_templates,
  getE_template,
  updateE_template,
  deleteE_template
};
