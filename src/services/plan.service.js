const httpStatus = require('http-status');
const { Plan , Transaction , User } = require('../models');
const Moment = require('moment')
const ApiError = require('../utils/ApiError');
const { sendOTP  } = require('../services/email.service');
const { userService } = require('../services')
var mongoose = require('mongoose');

const convertPriceToLocale = async (to , cb) => {
  const axios = require('axios');
  const { data } = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_'+to+'&compact=ultra&apiKey=fe5e844da603195d12b1');
  return data && data['USD_'+to] ? data['USD_'+to] : false;
}

/**
 * Create a plan
 * @param {Object} planBody
 * @returns {Promise<Plan>}
 */
const createPlan = async (planBody) => {
  if (await Plan.isNameTaken(planBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const plan = await Plan.create({ ...planBody });
  return plan;
};

/**
 * Query for plans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlans = async (filter, options) => {
  
  const plans = await Plan.paginate(filter, options);
  return plans;
};

/**
 * Get plan by id
 * @param {ObjectId} id
 * @returns {Promise<Plan>}
 */
const getPlanById = async (id) => {
  return await Plan.findById(id);
};

/**
 * Update plan by id
 * @param {ObjectId} planId
 * @param {Object} updateBody
 * @returns {Promise<Plan>}
 */
const updatePlanById = async (planId, updateBody) => {
  const plan = await getPlanById(planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  if (updateBody.email && (await Plan.isEmailTaken(updateBody.email, planId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(plan, updateBody);
  await plan.save();
  return plan;
};

/**
 * Delete plan by id
 * @param {ObjectId} planId
 * @returns {Promise<Plan>}
 */
const deletePlanById = async (planId) => {
  const plan = await getPlanById(planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  await plan.remove();
  return plan;
};

const validatePrice = async ( planId , amount , currencyType) => {
  const plan = await getPlanById(planId);
  if(currencyType == 'INR' || currencyType == 'USD'){
    return currencyType == 'INR' ? plan.price == amount : plan.priceInDollar == amount;
  } {
    let rate = await convertPriceToLocale(currency)   
    return Math.round(rate * priceInDollar * 100) / 100  == amount
  }
}
const subscribeUserToPlan = async ( userId , planId) => {
  let userDetail = await userService.getUserById(userId);
  if(!userDetail){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  let planDetail = await getPlanById(planId);
  if(!planDetail){
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  // create Subscription to user
  let subscriptionObj = userDetail.subscription ? userDetail.subscription : {};
  subscriptionObj['type'] = 'pro';
  subscriptionObj['start'] = subscriptionObj['start'] ? subscriptionObj['start'] : new Date().toISOString()  
  subscriptionObj['expires'] = subscriptionObj['expires'] ? Moment(subscriptionObj['expires']).add(planDetail.validity , 'month').format() : Moment().add(planDetail.validity , 'month').toISOString();
  
  await userService.updateUserById(mongoose.Types.ObjectId(userId) , {
    subscription : subscriptionObj
  });
  return {...subscriptionObj , ...{name : planDetail.name , validity : planDetail.validity}};

}

const addSubscriptionToUser = async ( metaData , intent) => {
  // create a transactions against this payment
  const saveObj = {
    transaction_id : intent.id,
    user: metaData.userId,
    planId : metaData.planId,
    amount : intent.amount / 100,
    currency : intent.currency,
    status: intent.status,
    client_secret : intent.client_secret
  }
  await Transaction.create(saveObj);
  let subscription = await subscribeUserToPlan(metaData.userId , metaData.planId);
  return { transaction: saveObj , subscription : subscription };
}

module.exports = {
  createPlan,
  queryPlans,
  getPlanById,
  updatePlanById,
  deletePlanById,
  validatePrice,
  addSubscriptionToUser
};
