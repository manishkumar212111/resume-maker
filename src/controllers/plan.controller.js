const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { planService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRTE_KEY);

const convertPriceToLocale = async (to , cb) => {
  const axios = require('axios');
  await axios.get('https://free.currconv.com/api/v7/convert?q=USD_'+to+'&compact=ultra&apiKey=fe5e844da603195d12b1').then( (res, err) => {
    console.log(res.data)
    cb(res.data ? res.data['USD_'+to] : false)
  })
}
const createPlan = catchAsync(async (req, res) => {
  const plan = await planService.createPlan(req.body);
  res.status(httpStatus.CREATED).send(plan);
});

const getPlans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await planService.queryPlans(filter, options);
  
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

const getPlan = catchAsync(async (req, res) => {
  let plan = await planService.getPlanById(req.params.planId);
  if (!plan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  if(req.query.currencyType) {
    if(req.query.currencyType == 'INR' || req.query.currencyType == 'USD'){

        let h = 
            {...plan._doc ,
             ...{ currencyType : req.query.currencyType , id : plan.id,
                 calculated_price :  req.query.currencyType == 'USD' ? plan._doc.priceInDollar : plan._doc.price  }} 
        res.send(h);
      } 
    else {

      await convertPriceToLocale(req.query.currencyType , (exchange_rate) => {
          
          let h = {...plan._doc ,
             ...{currencyType : exchange_rate ? req.query.currencyType : 'USD' ,id : plan.id,
                 calculated_price : Math.round((exchange_rate || 1) * plan._doc.priceInDollar * 100) / 100 } }
        res.send(h);
      
      })
    
    
    } 
  } else {
    res.send(plan);

  }

  // res.send(plan);
});

const updatePlan = catchAsync(async (req, res) => {
  const plan = await planService.updatePlanById(req.params.planId, req.body);
  res.send(plan);
});

const deletePlan = catchAsync(async (req, res) => {
  await planService.deletePlanById(req.params.planId);
  res.send({ status : true });
});

const handlePayment = catchAsync(async (req, res) => {
  
  let { amount, id, currencyType, planId } = req.body;
  // validate plan and price
  
  try {
    let intent;
    if (id) {
      // Create the PaymentIntent
      const validationResult = await planService.validatePrice(planId, amount , currencyType);
      if(!validationResult){
        res.json({
          error : true,
          message : "Price not same to original"
        })
        return;
      }
      
      intent = await stripe.paymentIntents.create({
        amount: parseInt(amount * 100),
        confirm : true,
        confirmation_method: 'manual',
        // return_url : "http://localhost:3000",
        metadata : {
          planId : planId,
          amount : amount,
          userId : req.user.id,
          currencyType : currencyType
        },
        currency: currencyType,
        description: "Your Company Description",
        payment_method: id,
      });
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        req.body.payment_intent_id
      );
    }
    // Send the response to the client
    res.send(await generateResponse(intent));

  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      error: true,
    });
  }
});

const generateResponse = async (intent) => {
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    };
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    let planDetail = await planService.addSubscriptionToUser(intent.metadata , intent);
    return {
      success: true,
      intent : intent,
      planDetail : planDetail 
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
};

module.exports = {
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  deletePlan,
  handlePayment
};

// const payment = await stripe.paymentIntents.create({
    //   amount: parseInt(amount * 100),
    //   confirm : true,
    //   return_url : "http://localhost:3000",
    //   metadata : {
    //     planId : req.body.planId,
    //     amount : amount,
    //     currencyType : currencyType
    //   },
    //   // "billing_details": {
    //   //   "address": {
    //   //     "city": "Jaipur",
    //   //     "country": "India",
    //   //     "line1": "dfgdfg",
    //   //     "line2": "dfgfdgf",
    //   //     "postal_code": "32332",
    //   //     "state": "dfgdfgf"
    //   //   },
    //   //   "email": "Manis@gmail.com",
    //   //   "name": "Manihs",
    //   //   "phone": "897987988"
    //   // },
    //   currency: currencyType,
    //   description: "Your Company Description",
    //   payment_method: id,
    //   confirm: true,
    // });
    