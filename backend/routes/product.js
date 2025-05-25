const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploader');
const { listProductController, createProduct, restaurantProductList, updateProduct } = require('../controller/product.controller');
const { isRestaurant } = require('../middleware/rbac');





// router.post('/create-product', authMiddleware, upload.single('image'), createProduct );


router.route('/product').post(authMiddleware, upload.single('image'), createProduct)
router.route('/product/:id').put(authMiddleware,upload.single('image'),isRestaurant, updateProduct)

router.route('/product/:restaurantId').get(listProductController)

router.route('/restaurant-owener/products').post(authMiddleware, isRestaurant,restaurantProductList)

module.exports = router;
