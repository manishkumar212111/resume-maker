const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

const e_templateSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
      unique : true
    },
    content: {
        type: String,
        required: true,
        index: true,
    },
    dynamic_var: {
      type: Array
    },
    subject: {
        type : String,
        required : true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
e_templateSchema.plugin(toJSON);
e_templateSchema.plugin(paginate);


/**
 * @typedef E_template
 */
const E_template = mongoose.model('E_template', e_templateSchema);

module.exports = E_template;
