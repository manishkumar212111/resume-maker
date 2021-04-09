const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const E_templateValidation = require('../../validations/e_template.validation');
const E_templateController = require('../../controllers/e_template.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageE_templates'), validate(E_templateValidation.createE_template), E_templateController.createE_template)
  .get(auth('getE_templates'), validate(E_templateValidation.getE_templates), E_templateController.getE_templates);

router
  .route('/:e_templateId')
  .get(auth('getE_templates'), validate(E_templateValidation.getE_template), E_templateController.getE_template)
  .patch(auth('manageE_templates'), validate(E_templateValidation.updateE_template), E_templateController.updateE_template)
  .delete(auth('manageE_templates'), validate(E_templateValidation.deleteE_template), E_templateController.deleteE_template);

module.exports = router;
