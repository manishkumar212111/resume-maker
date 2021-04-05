const httpStatus = require('http-status');
const { Transaction , User } = require('../models');
const Moment = require('moment')
const ApiError = require('../utils/ApiError');
const { sendOTP  } = require('../services/email.service');
const { userService } = require('../services')
var mongoose = require('mongoose');


/**
 * Create a transaction
 * @param {Object} transactionBody
 * @returns {Promise<Transaction>}
 */
const createTransaction = async (transactionBody) => {
  if (await Transaction.isNameTaken(transactionBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const transaction = await Transaction.create({ ...transactionBody });
  return transaction;
};

/**
 * Query for transactions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTransactions = async (filter, options) => {
    return await Transaction.paginate(filter, options , async (option) => {
        return await Transaction.find(option.filter).populate('user', { email: 1 })
        .populate('planId', { name: 1 }).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const transactions = await Transaction.paginate(filter, options);
//   return transactions;
};

/**
 * Get transaction by id
 * @param {ObjectId} id
 * @returns {Promise<Transaction>}
 */
const getTransactionById = async (id) => {
  return await Transaction.findById(id);
};

/**
 * Update transaction by id
 * @param {ObjectId} transactionId
 * @param {Object} updateBody
 * @returns {Promise<Transaction>}
 */
const updateTransactionById = async (transactionId, updateBody) => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  if (updateBody.email && (await Transaction.isEmailTaken(updateBody.email, transactionId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(transaction, updateBody);
  await transaction.save();
  return transaction;
};

/**
 * Delete transaction by id
 * @param {ObjectId} transactionId
 * @returns {Promise<Transaction>}
 */
const deleteTransactionById = async (transactionId) => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  await transaction.remove();
  return transaction;
};

module.exports = {
  createTransaction,
  queryTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
