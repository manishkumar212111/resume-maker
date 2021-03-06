const express = require('express');
const validate = require('../../middlewares/validate');
const PlanValidation = require('../../validations/plan.validation');
const EnquiryValidation = require('../../validations/enquiry.validation');
const BlogValidation = require('../../validations/blog.validation');
const ProductValidation = require('../../validations/product.validation');


const PlanController = require('../../controllers/plan.controller');
const EnquiryController = require('../../controllers/enquiry.controller');
const DashboardController = require('../../controllers/dashboard.controller');
const BlogController = require('../../controllers/blog.controller');
const ProductController = require('../../controllers/product.controller');


const router = express.Router();

router.get('/plans', validate(PlanValidation.getPlans), PlanController.getPlansByPrice);
router.get('/plans/:planId', validate(PlanValidation.getPlans), PlanController.getPlan);
router.post('/enquiry', validate(EnquiryValidation.createEnquiry), EnquiryController.createEnquiry);
router.get('/dashboard', DashboardController.getData);
router.get('/template', DashboardController.templateController);
router.get('/blog' , validate(BlogValidation.getBlogs) , BlogController.getBlogs);
router.get('/blog/:blogId' , validate(BlogValidation.getBlog) , BlogController.getBlog);

router.get('/downloads/api/:productId' ,validate(ProductValidation.getProduct) , ProductController.getProduct)

module.exports = router;
