const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { userDetails, userOrderDetails, listUsers } = require('../controller/user.controller');

router.route('/user')
.get(authMiddleware, userDetails);

router.route('/user/orders')
.get(authMiddleware, userOrderDetails);

router.route('/admin/users')
.get(authMiddleware, listUsers);

module.exports = router;

