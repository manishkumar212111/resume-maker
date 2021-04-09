const httpStatus = require('http-status');
const { E_template , User } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a e_template
 * @param {Object} e_templateBody
 * @returns {Promise<E_template>}
 */
const createE_template = async (e_templateBody) => {
  
  const e_template = await E_template.create({ ...e_templateBody });
  return e_template;
};

/**
 * Query for e_templates
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryE_templates = async (filter, options) => {
    
    return await E_template.paginate(filter, options , async (option) => {
        return await E_template.find(option.filter).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const e_templates = await E_template.paginate(filter, options);
//   return e_templates;
};

/**
 * Get e_template by id
 * @param {ObjectId} id
 * @returns {Promise<E_template>}
 */
const getE_templateById = async (id) => {
  return await E_template.findById(id);
};


/**
 * Get e_template by id
 * @param {ObjectId} id
 * @returns {Promise<E_template>}
 */
const getEmailTemplateByType = async (type) => { 
    return await E_template.find({type : type})
}
/**
 * Update e_template by id
 * @param {ObjectId} e_templateId
 * @param {Object} updateBody
 * @returns {Promise<E_template>}
 */
const updateE_templateById = async (e_templateId, updateBody) => {
  const e_template = await getE_templateById(e_templateId);
  if (!e_template) {
    throw new ApiError(httpStatus.NOT_FOUND, 'E_template not found');
  }
  if (updateBody.email && (await E_template.isEmailTaken(updateBody.email, e_templateId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(e_template, updateBody);
  await e_template.save();
  return e_template;
};

/**
 * Delete e_template by id
 * @param {ObjectId} e_templateId
 * @returns {Promise<E_template>}
 */
const deleteE_templateById = async (e_templateId) => {
  const e_template = await getE_templateById(e_templateId);
  if (!e_template) {
    throw new ApiError(httpStatus.NOT_FOUND, 'E_template not found');
  }
  await e_template.remove();
  return e_template;
};

module.exports = {
  createE_template,
  queryE_templates,
  getE_templateById,
  updateE_templateById,
  deleteE_templateById,
  getEmailTemplateByType,
};
