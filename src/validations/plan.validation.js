const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createplan = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    priceInDollar: Joi.number().required(),
    discount: Joi.number(),
    features: Joi.array(),
    status: Joi.boolean(),
    validity: Joi.number().required()
  }),
};

const getplans = {
  query: Joi.object().keys({
    status: Joi.boolean(),
    currencyType: Joi.string()
  }),
};

const getplan = {
  query: Joi.object().keys({
    status: Joi.boolean(),
    currencyType: Joi.string()
  }),
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
    priceInDollar: Joi.number(),
    discount: Joi.number(),
    features: Joi.array(),
    status: Joi.boolean(),
    validity: Joi.number()
    })
    .min(1),
};

const managePayment = {
  body: Joi.object()
    .keys({
    planId: Joi.custom(objectId),
    currencyType: Joi.string(),
    amount: Joi.number(),
    id : Joi.string(),
    payment_intent_id : Joi.string()  

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
  managePayment
};
