const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { notificationTypes } = require("../config/constants")

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true
    },
    priceInDollar: {
      type: Number,
      required: true
    },
    discount: {
        type: Number,
        required: true
    },
    validity: {
        type: Number,
        required: true
    },
    status: {
      type: Boolean,
      default: true,
    },
    features : {
        type : Array,
        default: []
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
planSchema.plugin(toJSON);
planSchema.plugin(paginate);


/**
 * Check if email is taken
 * @param {string} email - The plan's email
 * @param {ObjectId} [excludeUserId] - The id of the plan to be excluded
 * @returns {Promise<boolean>}
 */
 planSchema.statics.isNameTaken = async function (name, excludeUserId) {
    const plan = await this.findOne({ name, _id: { $ne: excludeUserId } });
    return !!plan;
  };

  
const plan = mongoose.model('plan', planSchema);

module.exports = plan;
