const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { notificationTypes } = require("../config/constants")

const basicSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,  
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
            }
        },
    },
    address : {
        type : Object,
        default : {
            address : "",
            status : true,
            city : {
                value : "",
                status : true
            },
            state : {
                value : "",
                status : true
            },
            country : {
                value : "",
                status : true
            },
        }
    },
    dob: {
        type : Date,
        default: null
    },
    contact: {
        type : String,
        default : null
    },
    ccode : {
      type : String,
      default : "+91"    
    },
    willing_to_relocate : {
        type : Boolean,
        default : false
    },
    social_account : {
        type : Array,
        default : [
          { type : "linkedin", status : false , url : "" },
          { type : "github", status : false , url : "" },
          { type : "instagram", status : false , url : "" },
          { type : "facebook", status : false , url : "" },
          { type : "twitter", status : false , url : "" },
          { type : "gitlab", status : false , url : "" }  
        ]
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
basicSchema.plugin(toJSON);
basicSchema.plugin(paginate);
  
const basic = mongoose.model('basic_info', basicSchema);

module.exports = basic;
