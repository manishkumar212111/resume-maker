const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

const transactionSchema = mongoose.Schema(
  {
    transaction_id: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    planId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'plan',
        required: true      
    },
    amount: {
      type: Number,
      required: true,
    },
    currency : {
        type : String
    },
    status : {
        type : String
    },
    client_secret : {
        type : String
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);


/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
