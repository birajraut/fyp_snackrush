const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {createSale, getSale} =  require('../controller/sale.controller')




router.route('/sale')
.post(authMiddleware, createSale)

router.route('/sale')
.get(authMiddleware, getSale)



module.exports = router;
