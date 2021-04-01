const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const planRoute = require('./plan.route');



const router = express.Router();

router.use('/auth', authRoute);
router.use(['/user', '/users'], userRoute);
router.use(['/plan', '/plans'], planRoute);



module.exports = router;
