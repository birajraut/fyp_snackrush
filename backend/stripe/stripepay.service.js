const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const  chargeCard = async (customerId, paymentMethodId, amount, currency = 'usd') =>{
    try {

  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: currency,
        customer: customerId, 
        payment_method: paymentMethodId,

        confirm: true, 
      });

      console.log('pay==>', paymentIntent)
  
      return paymentIntent; 
    } catch (error) {
      console.error('Error charging card:', error);
      return { error: error.message }; 
    }
  }

  module.exports = {chargeCard}