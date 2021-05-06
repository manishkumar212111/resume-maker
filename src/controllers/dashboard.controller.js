const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dashBoardService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);
const puppeteer = require('puppeteer');

const getData = catchAsync(async (req, res) => {
    let obj=  {
        user : await dashBoardService.getTodayRegisteredUser(),
        income : await dashBoardService.getIncomeOnDWMBasis(),
        categoryWiseIncome : await dashBoardService.getCategoryWiseIncome() 
    }
    res.send(obj)
});

const templateController = catchAsync(async(req, res) => {
    let path = require('path');
    // the browser path
    path = path.resolve('/usr/bin/google-chrome-stable')

    const browser = await puppeteer.launch({
        executablePath: path
    })
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://shrouded-crag-50550.herokuapp.com/pricing', {
      waitUntil: 'networkidle2',
    });
    let test =  await page.pdf({ path: 'hn.pdf', format: 'a4' });
  
    await browser.close();
    res.send(test)
})
module.exports = {
    getData,
    templateController
};
