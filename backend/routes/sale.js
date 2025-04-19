const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { isRestaurant} = require('../middleware/rbac')
const {createSale, getSale} =  require('../controller/sale.controller')




router.route('/sale')
.post(authMiddleware, createSale)

router.route('/restaurant/sale')
.post(authMiddleware,isRestaurant,   getSale)



module.exports = router;
