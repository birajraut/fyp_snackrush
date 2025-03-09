const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const {createResturant} = require('../controller/resturant.controller')
const upload = require('../middleware/uploader')




router.post('/resturant', authMiddleware, upload.single('logo'), createResturant );

module.exports = router;
