const express = require('express');
const router = express.Router();




router.post("/create-payment-intent", async (req, res) => {
    // try {
    // const { amount, currency } = req.body;

    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency,
    // });

    // res.json({ clientSecret: paymentIntent.client_secret });
    // } catch (error) {
    // console.error("Payment Error:", error);
    // res.status(500).json({ message: "Payment failed", error });
    // }
});

module.exports = router;
