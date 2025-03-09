const express = require('express');
const app = express.Router();

const authRoutes = require('./auth')
const resturantRoutes = require('./restaurant')
const paymentRoutes = require("./payment");
const productRoutes = require("./product");

app.use(authRoutes, paymentRoutes, resturantRoutes,  productRoutes)

module.exports = app;