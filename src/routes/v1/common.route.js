const express = require('express');
const validate = require('../../middlewares/validate');
const PlanValidation = require('../../validations/plan.validation');
const EnquiryValidation = require('../../validations/enquiry.validation');

const PlanController = require('../../controllers/plan.controller');
const EnquiryController = require('../../controllers/enquiry.controller');


const router = express.Router();

router.get('/plans', validate(PlanValidation.getPlans), PlanController.getPlans);
router.get('/plans/:planId', validate(PlanValidation.getPlans), PlanController.getPlan);
router.post('/enquiry', validate(EnquiryValidation.createEnquiry), EnquiryController.createEnquiry);


module.exports = router;
