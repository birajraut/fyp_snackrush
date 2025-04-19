const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {userDetails, userOrderDetails} = require('../controller/user.controller')






router.route('/user')
.get(authMiddleware, userDetails)

router.route('/user/orders')
.get(authMiddleware, userOrderDetails)




module.exports = router;
