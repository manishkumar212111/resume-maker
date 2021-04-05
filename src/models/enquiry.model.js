const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

const enquirySchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    message: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
    status: {
      type: String,
      default : "pending"
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
enquirySchema.plugin(toJSON);
enquirySchema.plugin(paginate);


/**
 * @typedef Enquiry
 */
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
