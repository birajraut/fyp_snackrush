const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {createProduct} = require('../controller/product.controller')
const upload = require('../middleware/uploader')




router.post('/create-product', authMiddleware, upload.single('file'), createProduct );

module.exports = router;
