const httpStatus = require('http-status');
const { Plan , Transaction , User } = require('../models');
const Moment = require('moment')
const ApiError = require('../utils/ApiError');
const { sendOTP  } = require('../services/email.service');
const { userService } = require('../services')
var mongoose = require('mongoose');


const getTodayRegisteredUser = async () => {
    var startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);
    // creates ObjectId() from date:
    var _id = Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

    let user = await User.find({ _id: { $gte: _id } })
    return user.length;
};

const getIncomeOnDWMBasis = async () =>  {
    let trans = await Transaction.aggregate([
        // First total per day. Rounding dates with math here
        { "$group": {
            "_id": {
                "$add": [
                    { "$subtract": [
                        { "$subtract": [ "$createdAt", new Date(0) ] },
                        { "$mod": [
                            { "$subtract": [ "$createdAt", new Date(0) ] },
                            1000 * 60 * 60 * 24
                        ]}                        
                    ]},
                    new Date(0)
                ]
            },
            "week": { "$first": { "$week": "$createdAt" } },
            "month": { "$first": { "$month": "$createdAt" } },
            "total": { "$sum": "$amount" }
        }},
    
        // Then group by week
        { "$group": {
            "_id": "$week",
            "month": { "$first": "$month" },
            "days": {
                "$push": {
                    "day": "$_id",
                    "total": "$total"
                }
            },
            "total": { "$sum": "$total" }
        }},
        
        // Then group by month
        { "$group": {
            "_id": "$month",
            "weeks": {
                "$push": {
                    "week": "$_id",
                    "total": "$total",
                    "days": "$days"
                }
            },
            "total": { "$sum": "$total" }
        }},
    ]);

    return trans;
}

const getCategoryWiseIncome = async () => {
    let income = await Transaction.aggregate([
        {
            $group : {
                
                    _id: '$planId',
                    total : { $sum :'$amount'}
                  
            }
        },
        {$lookup : {
            from: 'plans',
            localField: '_id',
            foreignField: '_id',
            as: 'plan'
            }
        }
    ])

    return income;
}
module.exports = {
  getTodayRegisteredUser,
  getIncomeOnDWMBasis,
  getCategoryWiseIncome
};
