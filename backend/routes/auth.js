const express = require('express');
const router = express.Router();

const {regitserUser, loginUser, OTPVerify} = require('../controller/auth.controller')

router.post('/auth/register',regitserUser);
router.post('/auth/login',loginUser);
router.post('/auth/otp-verify',OTPVerify);

module.exports = router;