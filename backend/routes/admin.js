const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { isAdmin } = require('../middleware/rbac');
const { adminRestaurantList, adminRestaurantUpdate, adminDashboard } = require('../controller/admin.controller');





router.route('/admin/restaurant-list')
    .get(authMiddleware, isAdmin, adminRestaurantList)

router.route('/admin/dashboard')
    .get(authMiddleware, isAdmin, adminDashboard)

router.route('/admin/restaurant-update')
    .post(authMiddleware, isAdmin, adminRestaurantUpdate)



module.exports = router;

