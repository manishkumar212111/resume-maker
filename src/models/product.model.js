const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { notificationTypes } = require("../config/constants")

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default : ""
    },
    default: {
        type: Boolean,
        default: false
    },
    template_id: {
        type: String,
        trim: true,
        default: 1  
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,  
    },
    status : {
        type : Number,
        default : 1
    },
    contact_information : {
        type : Object,
        default : {
            name : "",
            title : "",
            phone_number : "",
            email : "",
            social_account : {
                facebook : "",
                insta : "",
                linkedin: "",
                twitter : "",
                skype: "",
                codebase: "",
                website:"",
                extra : ""
            },
            website : "",
            address : "",
            city : "",
            country: "",
            dob: "",
            state: "",
            willing_to_relocate: ""
        }
    },
    summary : {
        type : String,
        default : ""
    },
    employment_history: {
        type : Object,
        default : {
            title : "",
            company : "",
            location : "",
            durantion : {
                from : "",
                to: ""
            },
            achievements : "",
            description: ""
        }
    },
    education : {
        type : Object,
        default : {
            institute_name: "",
            degree : "",
            degree_major: "",
            duration : {
                from : "",
                to: ""
            },
            courses : [],
            projects: [],
            thesis: [],
            awards: [],
            location : "",
            marks : {
                value: "",
                type: ""
            }
        }
    },
    skills :{ 
        type : Object,
        default : {
            softSkills : [],
            skills : []
        }
    },
    languages : {
        type : Array,
        default: []
    },
    certifications : {
        type : Object,
        default : [{
            name: "",
            issued_by : "",
            date : "",
            location : "",
            certificate_id : ""
        }]
    },
    publications : {
        type : Object,
        default : [{
            title: "",
            publisher : "",
            date : "",
            url : "",
            description : ""
        }]
    },
    trainings : {
        type : Object,
        default : [{
            title: "",
            provider : "",
            date : "",
            location : "",
            description : ""
        }]
    },
    conferences : {
        type : Object,
        default : [{
            topic: "",
            date : "",
            location : "",
            description : ""
        }]
    },
    awards : {
        type : Object,
        default : [{
            title: "",
            date : "",
            issued_by:"",
            location : "",
            description : ""
        }]
    },
    achievements : {
        type : Object,
        default : [{
            title: "",
            date : "",
            associated_with:"",
            description : ""
        }]
    },
    volunteers_works : {
        type : Object,
        default : [{
            organization_name: "",
            cause : "",
            role:"",
            date : "",
            description: "",
            location:""
        }]
    },
    patents : {
        type : Object,
        default : [{
            tite: "",
            PAN : "",
            url:"",
            description : "",
            location:""
        }]
    },
    references : {
        type : Object,
        default: [{
            name: "",
            company: "",
            contact: ""   
        }]
    },
    hobbies: {
        type: Object,
        default: []
    },
    custom_field : {
        type : Object,
        default: {
            title : "",
            date: "",
            description: "",
            location : ""
        }
    },
    sample_map : {
        type : Object,
        default : {
            contact_information : true,
            summary : true,
            employment_history : true,
            skills : true,
            languages: true,
            certifications : false,
            trainings : false,
            publications : false,
            conferences : false,
            awards : false,
            achievements: false,
            volunteers_works: false,
            patents : false,
            references : false,
            hobbies : false,
            custom_field: false
        }
    },
    style : {
        type : Object,
        default : {
            fontSize : 10,
            fontType : "",
            fontStyle : "",
            background : "",
            text_color: "",
            theme : "",
            icons : [
                { value:"summary", text: "Summary" , status : false},
                { value:"jobTitle", text: "Job Title" , status : false},
                { value:"industry", text: "Industry" , status : false},
                { value:"photo", text: "Photo" , status : false},
            
            ]
        }
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The product's email
//  * @param {ObjectId} [excludeUserId] - The id of the product to be excluded
//  * @returns {Promise<boolean>}
//  */
//  productSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const product = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!product;
//   };

  
const product = mongoose.model('product', productSchema);

module.exports = product;
