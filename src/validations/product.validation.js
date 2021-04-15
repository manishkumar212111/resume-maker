const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    contact_information : Joi.object(),
    summary : Joi.string(),
    employment_history : Joi.object(),
    skills : Joi.object(),
    languages: Joi.array(),
    certifications : Joi.array(),
    trainings : Joi.array(),
    publications : Joi.array(),
    conferences : Joi.array(),
    awards : Joi.array(),
    achievements: Joi.array(),
    volunteers_works: Joi.array(),
    patents : Joi.array(),
    references : Joi.array(),
    hobbies : Joi.array(),
    custom_field: Joi.object(),
    name: Joi.string().required(),
    smaple_id : Joi.string().required(),
    user:Joi.required().custom(objectId),
    status : Joi.number(),
    sample_map : Joi.object(),
    style : Joi.object() 
  }),
};

const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        contact_information : Joi.object(),
        summary : Joi.string(),
        employment_history : Joi.object(),
        skills : Joi.object(),
        languages: Joi.array(),
        certifications : Joi.array(),
        trainings : Joi.array(),
        publications : Joi.array(),
        conferences : Joi.array(),
        awards : Joi.array(),
        achievements: Joi.array(),
        volunteers_works: Joi.array(),
        patents : Joi.array(),
        references : Joi.array(),
        hobbies : Joi.array(),
        custom_field: Joi.object(),
        name: Joi.string(),
        smaple_id : Joi.string(),
        status : Joi.number(),
        sample_map : Joi.object(),
        style : Joi.object()        
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const getProductUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductUser
};
