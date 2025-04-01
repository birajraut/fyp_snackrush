const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {createResturant, listResturant, restaurantDetails, restaurantLogin} = require('../controller/resturant.controller')
const upload = require('../middleware/uploader')




// router.post('/resturant', authMiddleware, upload.single('logo'), createResturant ).get();

router.route('/restaurant')
.post(authMiddleware, upload.single('logo'), createResturant)
.get( listResturant)

router.route('/restaurant/:id')
.get(restaurantDetails)

router.route('/restaurant/login')
.post(restaurantLogin)

module.exports = router;
