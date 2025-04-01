const Sales = require("../models/Sales")
const User = require("../models/User")
const Sale = require("../models/Sales")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { createStripeCustomer } = require('../stripe/customer.service');
const { chargeCard } = require("../stripe/stripepay.service");


const createSaleService = async (userId, paymentMethodId, products) => {
    try {
        const user = await User.findById(userId);

        // Check if user has a Stripe customer ID, create one if not
        let customerId = user.stripe_customer_id;
        if (!customerId) {
            customerId = await createStripeCustomer(user._id, user.email, user.fullName, null);
        }

        // Charge the user's card for each product
        const chargePromises = products?.map((item) => chargeCard(customerId, paymentMethodId, item.price));
        const chargeResponses = await Promise.all(chargePromises);

        // If charging is successful, save the sale to the database
        if (chargeResponses && chargeResponses.length === products.length) {
            const salePromises = products?.map((item) => {
                const saleData = new Sale({
                    product_id: item.product_id,
                    quantity: 1,
                    sale_date: Date.now(),
                    payment_status: 'Paid',
                });

                return saleData.save(); // Return the promise to be awaited
            });

            // Wait for all sale records to be saved
            const savedSales = await Promise.all(salePromises);

            return savedSales;
        } else {
            throw new Error('Payment failed for one or more items');
        }

    } catch (error) {
        console.error('Error in createSaleService:', error);
        throw new Error('An error occurred while processing the sale');
    }
};


const getSaleService = async (userId) => {
    const user = await User.findById(userId)
    try {
        // Query the Product collection where the restaurant_id matches the given restaurantId
        const sales = Sales.find({});
        console.log(sales, 'sales from db')
        if (!sales || sales.length === 0) {
            // If no sales are found, return a custom message
            return { message: 'No sales found for this restaurant' };
        }

        return sales; // Return the list of sales found for the restaurant
    } catch (error) {
        // Handle any errors that occur during the database query
        throw new Error('Error fetching sales: ' + error.message);
    }
}

module.exports = { createSaleService, getSaleService }