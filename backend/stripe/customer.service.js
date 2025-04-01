const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const User = require("../models/User")


const createStripeCustomer = async (userId, email, name = null, description = null) =>{
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      description: description,
    });
      await User.updateOne(
                { _id: userId }, 
                { $set: { stripe_customer_id: customer.id } } 
              );
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return { error: error.message };
  }
}

module.exports = {createStripeCustomer}

