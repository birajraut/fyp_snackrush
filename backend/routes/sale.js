const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { isRestaurant } = require('../middleware/rbac');
const { createSale, getSale } = require('../controller/sale.controller');

// Route to create a sale (for users)
router.route('/sale')
  .post(authMiddleware, createSale);

// Route to fetch sales (for restaurants or users)
router.route('/sales')
  .post(authMiddleware, getSale); // No role restriction, supports both users and restaurants

// Route to fetch sales specifically for restaurants
router.route('/restaurant/sales')
  .post(authMiddleware, isRestaurant, getSale);

module.exports = router;