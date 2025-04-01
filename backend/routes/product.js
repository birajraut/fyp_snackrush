const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploader');
const { listProductController,createProduct} = require('../controller/product.controller')





// router.post('/create-product', authMiddleware, upload.single('image'), createProduct );


router.route('/product').post(  upload.single('image'), createProduct )
router.route('/product/:restaurantId').get( listProductController)

module.exports = router;
