const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dashBoardService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const getData = catchAsync(async (req, res) => {
    let obj=  {
        user : await dashBoardService.getTodayRegisteredUser(),
        income : await dashBoardService.getIncomeOnDWMBasis(),
        categoryWiseIncome : await dashBoardService.getCategoryWiseIncome() 
    }
    res.send(obj)
});
module.exports = {
getData};
