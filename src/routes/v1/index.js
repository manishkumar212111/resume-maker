const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const planRoute = require('./plan.route');
const transactionRoute = require('./transaction.route');
const enquiryRoute = require('./enquiry.route');
const commonRoute = require('./common.route');
const blogRoute = require('./blog.route');
const E_template = require("./e.template.route")
const Product = require("./product.route")



const router = express.Router();

router.use('/auth', authRoute);
router.use(['/user', '/users'], userRoute);
router.use(['/plan', '/plans'], planRoute);
router.use(['/common'], commonRoute);
router.use(['/transaction'], transactionRoute);

router.use(['/enquiry'], enquiryRoute);
router.use(['/blog'], blogRoute);
router.use('/email-template', E_template);
router.use('/product', Product);





module.exports = router;
