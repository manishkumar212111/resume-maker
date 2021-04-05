const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const PlanValidation = require('../../validations/plan.validation');
const PlanController = require('../../controllers/plan.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('managePlans'), validate(PlanValidation.createPlan), PlanController.createPlan)
  .get(auth('getPlans'), validate(PlanValidation.getPlans), PlanController.getPlans);

router
  .route('/:planId')
  .get(auth('getPlans'), validate(PlanValidation.getPlan), PlanController.getPlan)
  .patch(auth('managePlans'), validate(PlanValidation.updatePlan), PlanController.updatePlan)
  .delete(auth('managePlans'), validate(PlanValidation.deletePlan), PlanController.deletePlan);

router
  .route('/stripe/charge')
  .post(auth('managePayment'), validate(PlanValidation.managePayment), PlanController.handlePayment)

module.exports = router;
