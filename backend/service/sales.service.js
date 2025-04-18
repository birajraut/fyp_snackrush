const Sales = require("../models/Sales")
const User = require("../models/User")
const Sale = require("../models/Sales")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const { createStripeCustomer } = require('../stripe/customer.service');
const { chargeCard } = require("../stripe/stripepay.service");


const Product = require('../models/Product');

const createSaleService = async (userId, paymentMethodId, products) => {
  try {
    const user = await User.findById(userId);

    // Stripe customer setup
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      customerId = await createStripeCustomer(user._id, user.email, user.fullName, null);
    }

    let totalCost = 0;
    const saleItems = [];

    for (const item of products) {
      const product = await Product.findById(item.product_id);
      if (!product) throw new Error(`Product not found: ${item.product_id}`);

      const quantity = Math.round(item.price / product.price);
      if (quantity < 1) throw new Error('Invalid quantity derived from price');

      totalCost += item.price;

      saleItems.push({
        product_id: product._id,
        quantity,
        price: product.price,
      });

      // Charge per item or once for totalCost depending on your logic
      await chargeCard(customerId, paymentMethodId, item.price);
    }

    const saleData = new Sale({
      products: saleItems,
      total_cost: totalCost,
      payment_status: 'Paid',
      user_id: userId,
    });

    const savedSale = await saleData.save();
    return savedSale;

  } catch (error) {
    console.error('Error in createSaleService:', error);
    throw new Error('An error occurred while processing the sale');
  }
};

  


const getSaleService = async ({user_id,restaurant_id:restaurantId}) => {


  const matchCriteria = {};
  if (restaurantId) {
    matchCriteria["productDetails.restaurant_id"] = new mongoose.Types.ObjectId(restaurantId);
  }

  // If userId is provided, add filtering for it
  if (user_id) {
    matchCriteria["user_id"] = new mongoose.Types.ObjectId(user_id);
  }

    // const sales = await Sales.find({ restaurantId: restaurantId })



    // const sales = await Sale.aggregate([
    //   { $unwind: "$products" },
    //   {
    //     $lookup: {
    //       from: "products", // collection name (usually lowercase plural of model)
    //       localField: "products.product_id",
    //       foreignField: "_id",
    //       as: "productDetails"
    //     }
    //   },
    //   { $unwind: "$productDetails" },
    //   {
    //     $match: {
    //       "productDetails.restaurant_id": new mongoose.Types.ObjectId(restaurantId)
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       user_id: { $first: "$user_id" },
    //       products: { $push: "$products" },
    //       total_cost: { $first: "$total_cost" },
    //       sale_date: { $first: "$sale_date" },
    //       payment_status: { $first: "$payment_status" }
    //     }
    //   }
    // ]);


    const sales = await Sale.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $match: matchCriteria // Apply dynamic filtering criteria

      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$userDetails" },
          products: { 
            $push: {
              product: "$productDetails",
              quantity: "$products.quantity",
              price: "$products.price"
            }
          },
          total_cost: { $first: "$total_cost" },
          sale_date: { $first: "$sale_date" },
          payment_status: { $first: "$payment_status" }
        }
      }
    ]);


    console.log('sales', sales)

    return sales
   
}

module.exports = { createSaleService, getSaleService }