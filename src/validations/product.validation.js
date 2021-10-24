const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    contact_information : Joi.object(),
    basic_info: Joi.string().custom(objectId),
    summary : Joi.string(),
    employment_history : Joi.array(),
    skills : Joi.object(),
    languages: Joi.array(),
    certifications : Joi.array(),
    trainings : Joi.array(),
    publications : Joi.array(),
    conferences : Joi.array(),
    awards : Joi.array(),
    achievements: Joi.array(),
    volunteers: Joi.array(),
    patents : Joi.array(),
    references : Joi.array(),
    hobbies : Joi.array(),
    custom_field: Joi.array(),
    name: Joi.string(),
    template_id : Joi.string().required(),
    user:Joi.custom(objectId),
    status : Joi.number(),
    sample_map : Joi.object(),
    style : Joi.object(),
    extra : Joi.object(),
    education : Joi.array(),
    job_title : Joi.string()        

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
        basic_info: Joi.string().custom(objectId),
        education : Joi.array(),        
        employment_history : Joi.array(),
        skills : Joi.object(),
        softSkills : Joi.object(),
        languages: Joi.array(),
        user:Joi.custom(objectId),
        certifications : Joi.array(),
        trainings : Joi.array(),
        publications : Joi.array(),
        conferences : Joi.array(),
        awards : Joi.array(),
        achievements: Joi.array(),
        volunteers: Joi.array(),
        patents : Joi.array(),
        references : Joi.array(),
        hobbies : Joi.array(),
        custom_field: Joi.array(),
        name: Joi.string(),
        template_id : Joi.string(),
        status : Joi.number(),
        sample_map : Joi.object(),
        style : Joi.object(),
        extra : Joi.object(),
        job_title : Joi.string()        
    })
    
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const getProductUser = {
  body: Joi.object().keys({
    first_name : Joi.string(),
    last_name : Joi.string(),
    email : Joi.string(),
    address : Joi.object(),
    dob : Joi.date(),
    contact : Joi.string(),
    ccode : Joi.string(),
    willing_to_relocate : Joi.boolean(),
    social_account : Joi.array()
    })
}

const updateUserInfo = {

}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductUser,
  updateUserInfo
};
