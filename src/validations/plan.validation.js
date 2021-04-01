const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createplan = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number(),
    features: Joi.array(),
    status: Joi.boolean(),
    validity: Joi.number().required()
  }),
};

const getplans = {
  query: Joi.object().keys({
    status: Joi.boolean()
  }),
};

const getplan = {
  params: Joi.object().keys({
    planId: Joi.string().custom(objectId),
  }),
};

const updateplan = {
  params: Joi.object().keys({
    planId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    discount: Joi.number(),
    features: Joi.array(),
    status: Joi.boolean(),
    validity: Joi.number()
    })
    .min(1),
};

const deleteplan = {
  params: Joi.object().keys({
    planId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createplan,
  getplans,
  getplan,
  updateplan,
  deleteplan,
};
