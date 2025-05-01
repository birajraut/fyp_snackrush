const express = require('express');
const app = express.Router();

const authRoutes = require('./auth')
const resturantRoutes = require('./restaurant')
const paymentRoutes = require("./payment");
const productRoutes = require("./product");
const userRoutes = require("./user");
const saleRoutes = require('./sale');
const blogRoutes = require('./blog')


const adminRoutes = require('./admin')

app.use(authRoutes,blogRoutes, paymentRoutes, resturantRoutes, productRoutes, userRoutes, saleRoutes, adminRoutes)

module.exports = app;