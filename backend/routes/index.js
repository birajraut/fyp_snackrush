const express = require('express');
const app = express.Router();

const authRoutes = require('./auth')
const resturantRoutes = require('./restaurant')
const paymentRoutes = require("./payment");
const productRoutes = require("./product");
const userRoutes = require("./user");
const saleRoutes = require('./sale')

app.use(authRoutes, paymentRoutes, resturantRoutes,  productRoutes, userRoutes, saleRoutes)

module.exports = app;