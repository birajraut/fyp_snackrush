const express = require('express');
const router = express.Router();

const { regitserUser, loginUser, OTPVerify, forgotPassword,resetPassword } = require('../controller/auth.controller');

router.post('/auth/register', regitserUser);
router.post('/auth/login', loginUser);
router.post('/auth/otp-verify', OTPVerify);
router.post('/auth/forgot-password', forgotPassword);

router.post('/auth/reset-password',resetPassword);

module.exports = router;

