const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const convertPriceToLocale = async (to , cb) => {
  const axios = require('axios');
  await axios.get('https://free.currconv.com/api/v7/convert?q=USD_'+to+'&compact=ultra&apiKey=fe5e844da603195d12b1').then( (res, err) => {
    console.log(res.data)
    cb(res.data ? res.data['USD_'+to] : false)
  })
}
const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(httpStatus.CREATED).send(transaction);
});

const getTransactions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await transactionService.queryTransactions(filter, options);
  
  if(req.query.currencyType){
    if(req.query.currencyType == 'INR' || req.query.currencyType == 'USD'){

        let h = []
        result.results.forEach(async element => {
          console.log(element._doc)
          h.push(
            {...element._doc ,
             ...{ currencyType : req.query.currencyType , id : element.id,
                 calculated_price :  req.query.currencyType == 'USD' ? element._doc.priceInDollar : element._doc.price  } })
        });
        result.results = h;
        res.send(result);
      

    } else {

      await convertPriceToLocale(req.query.currencyType , (exchange_rate) => {
        let h = []
        result.results.forEach(async element => {
          console.log(element._doc)
          
          h.push(
            {...element._doc ,
             ...{currencyType : exchange_rate ? req.query.currencyType : 'USD' ,id : element.id,
                 calculated_price : Math.round((exchange_rate || 1) * element._doc.priceInDollar * 100) / 100 } })
        });
        result.results = h;
        res.send(result);
      
      })
    
    }
    
  } else {
    res.send(result);

  }

});

const getTransaction = catchAsync(async (req, res) => {
  let transaction = await transactionService.getTransactionById(req.params.transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
    res.send(transaction);
  // res.send(transaction);
});

const updateTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.updateTransactionById(req.params.transactionId, req.body);
  res.send(transaction);
});

const deleteTransaction = catchAsync(async (req, res) => {
  await transactionService.deleteTransactionById(req.params.transactionId);
  res.send({ status : true });
});

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
