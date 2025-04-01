const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {userDetails} = require('../controller/user.controller')






router.route('/user')
.get(authMiddleware, userDetails)

// router.route('/user/:id')
// .get(authMiddleware, userDetails)

module.exports = router;
