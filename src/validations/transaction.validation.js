const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTransaction = {
  body: Joi.object().keys({
  }),
};

const getTransactions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransaction = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    TransactionId: Joi.string().custom(objectId),
  }),
};

const updateTransaction = {
  params: Joi.object().keys({
    TransactionId: Joi.required().custom(objectId),
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

const deleteTransaction = {
  params: Joi.object().keys({
    TransactionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction
};
