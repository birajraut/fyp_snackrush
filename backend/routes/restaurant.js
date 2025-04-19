const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { isRestaurant } = require('../middleware/rbac')
const { createResturant, listResturant, restaurantDetails, restaurantLogin, restaurantDetailsOwener,  updateRestaurantImage // ⬅️ Add this line
} = require('../controller/resturant.controller')
const upload = require('../middleware/uploader')





router.route('/restaurant')
    .post(authMiddleware, upload.single('image'), createResturant)
    .get(listResturant)
    
    router.route('/restaurant/:restaurantId/image')
    .put(authMiddleware, isRestaurant, upload.single('image'), updateRestaurantImage);


router.route('/restaurant/:id')
    .get(restaurantDetails)

router.route('/restaurant/login')
    .post(restaurantLogin)

    router.route('/restaurant-owener')
    .get(authMiddleware, isRestaurant, restaurantDetailsOwener)

    

module.exports = router;
