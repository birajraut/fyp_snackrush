const Sales = require("../models/Sales");
const User = require("../models/User");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

const { createStripeCustomer } = require("../stripe/customer.service");
const { chargeCard } = require("../stripe/stripepay.service");

const createSaleService = async (userId, restaurantId, paymentMethodId, products) => {
  try {
    const user = await User.findById(userId);
console.log("products found:", products);
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
      if (quantity < 1) throw new Error("Invalid quantity derived from price");

      totalCost += item.price;

      saleItems.push({
        product_id: product._id,
        quantity,
        price: product.price,
      });

      // Charge per item or once for totalCost depending on your logic
      await chargeCard(customerId, paymentMethodId, item.price);
    }

    const saleData = new Sales({
      products: saleItems,
      total_cost: totalCost,
      payment_status: "Paid",
      delivery_status: "Cooking",

      user_id: userId,
      restaurant_id: restaurantId, // Include restaurant_id
    });

    const savedSale = await saleData.save();
    return savedSale;
  } catch (error) {
    console.error("Error in createSaleService:", error);
    throw new Error("An error occurred while processing the sale");
  }
};

const getSaleService = async (filterCriteria) => {
  try {
    const matchCriteria = {};

    // Add filtering for user_id or restaurant_id if provided
    if (filterCriteria?.user_id) {
      matchCriteria.user_id = new mongoose.Types.ObjectId(filterCriteria?.user_id);
    }
    if (filterCriteria?.restaurant_id) {
      matchCriteria.restaurant_id = new mongoose.Types.ObjectId(filterCriteria?.restaurant_id);
    }

    const sales = await Sales.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products", // collection name (usually lowercase plural of model)
          localField: "products.product_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $match: matchCriteria, // Apply dynamic filtering criteria
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$userDetails" },
          restaurant_id: { $first: "$restaurant_id" },
          products: {
            $push: {
              product: "$productDetails",
              quantity: "$products.quantity",
              price: "$products.price",
            },
          },
          total_cost: { $first: "$total_cost" },
          sale_date: { $first: "$sale_date" },
          payment_status: { $first: "$payment_status" },
          delivery_status: { $first: "$delivery_status" },
        },
      },
    ]);

    return sales;
  } catch (error) {
    console.error("Error in getSaleService:", error);
    throw new Error("An error occurred while fetching sales");
  }
};

const updateDeliveryStatusService = async (saleId, status) => {
  try {
    const sale = await Sales.findById(saleId);
    if (!sale) throw new Error(`Sale not found: ${saleId}`);

    sale.delivery_status = status;
    const updatedSale = await sale.save();
    return updatedSale;
  } catch (error) {
    console.error("Error in updateDeliveryStatusService:", error);
    throw new Error("An error occurred while updating delivery status");
  }
};

module.exports = { createSaleService, getSaleService, updateDeliveryStatusService };
