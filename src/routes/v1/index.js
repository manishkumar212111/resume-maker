const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const planRoute = require('./plan.route');
const transactionRoute = require('./transaction.route');
const enquiryRoute = require('./enquiry.route');
const commonRoute = require('./common.route');



const router = express.Router();

router.use('/auth', authRoute);
router.use(['/user', '/users'], userRoute);
router.use(['/plan', '/plans'], planRoute);
router.use(['/common'], commonRoute);
router.use(['/transaction'], transactionRoute);

router.use(['/enquiry'], enquiryRoute);





module.exports = router;
