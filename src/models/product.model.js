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
    basic_info: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'basic_info',
        required: true,  
    },
    extra: {
        type : Object,
        default : {}
    },
    status : {
        type : Number,
        default : 1
    },
    basic_info : {
        type : Object,
        default : {
            first_name : "",
            last_name : "",
            email : "",
            address : {
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
            },
            dob : "",
            contact : "",
            ccode: "+91",
            willing_to_relocate : "",
            social_account : [
                { type : "linkedin", status : false , url : "" },
                { type : "github", status : false , url : "" },
                { type : "instagram", status : false , url : "" },
                { type : "facebook", status : false , url : "" },
                { type : "twitter", status : false , url : "" },
                { type : "gitlab", status : false , url : "" }
            ]
        }
    },
    summary : {
        type : String,
        default : ""
    },
    employment_history: {
        type : Array,
        default : [],
        // {
        //     title : "",
        //     company : "",
        //     location : "",
        //     durantion : {
        //         from : "",
        //         to: ""
        //     },
        //     achievements : "",
        //     description: ""
        // }
    },
    education : {
        type : Array,
        default : [
            // {
        //     institute_name: "",
        //     degree : "",
        //     degree_major: "",
        //     duration : {
        //         from : {mm : "" , yy : ""},
        //         to: {mm : "" , yy : ""}
        //     },
        //     courses : [],
        //     projects: [],
        //     thesis: [],
        //     awards: [],
        //     location : "",
        //     marks : {
        //         value: "",
        //         type: ""
        //     }
        // }
        ]
    },
    skills :{ 
        type : Object,
        default : {
            softSkills : [],
            skills : [
                // {
                    // value : "",
                    // score: 50
                // }
            ]
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
        default : [
        //     {
        //     title: "",
        //     publisher : "",
        //     date : "",
        //     url : "",
        //     description : ""
        // }
    ]
    },
    trainings : {
        type : Object,
        default : [
        //     {
        //     title: "",
        //     provider : "",
        //     date : "",
        //     location : "",
        //     description : ""
        // }
        ]
    },
    conferences : {
        type : Object,
        default : [
        //     {
        //     title: "",
        //     date : "",
        //     location : "",
        //     description : ""
        // }
        ]
    },
    awards : {
        type : Array,
        default : []
        // default : [{
        //     title: "",
        //     date : "",
        //     issued_by:"",
        //     location : "",
        //     description : ""
        // }]
    },
    achievements : {
        type : Object,
        default : [{
            title: "",
            date : "",
            location: "",
            associated_with:"",
            description : ""
        }]
    },
    volunteers : {
        type : Object,
        default : [{
            organization_name: "",
            title : "",
            role:"",
            date : "",
            description: "",
            location:""
        }]
    },
    patents : {
        type : Object,
        default : [
        //     {
        //     tite: "",
        //     PAN : "",
        //     url:"",
        //     description : "",
        //     location:""
        // }
    ]
    },
    references : {
        type : Object,
        default: [
        //     {
        //     name: "",
        //     company: "",
        //     contact: ""   
        // }
    ]
    },
    hobbies: {
        type: Array,
        default: []
    },
    custom_field : [{
        type : Object,
        default: {
            title : "",
            date: "",
            description: "",
            location : ""
        }
    }],
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
            volunteers: false,
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
