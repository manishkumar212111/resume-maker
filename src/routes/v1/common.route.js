const express = require('express');
const validate = require('../../middlewares/validate');
const PlanValidation = require('../../validations/plan.validation');
const EnquiryValidation = require('../../validations/enquiry.validation');

const PlanController = require('../../controllers/plan.controller');
const EnquiryController = require('../../controllers/enquiry.controller');
const DashboardController = require('../../controllers/dashboard.controller');


const router = express.Router();

router.get('/plans', validate(PlanValidation.getPlans), PlanController.getPlansByPrice);
router.get('/plans/:planId', validate(PlanValidation.getPlans), PlanController.getPlan);
router.post('/enquiry', validate(EnquiryValidation.createEnquiry), EnquiryController.createEnquiry);
router.get('/dashboard', DashboardController.getData);



module.exports = router;
