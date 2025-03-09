import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutPage: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        try {
        // Step 1: Get client secret from backend
            const { data } = await axios.post("http://localhost:8000/api/payments/create-payment-intent", {
                amount: 5000, // Amount in cents ($50.00)
                currency: "usd",
            });

        // Step 2: Confirm Payment with Stripe
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
            },
            });

            if (result.error) {
                setMessage(result.error.message || "Payment failed");
            } else {
                setMessage("Payment successful!");
            }
        } catch (error) {
            setMessage("Error processing payment.");
            console.error(error);
        }

    setLoading(false);
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Stripe Payment</h1>
        <form onSubmit={handlePayment} className="bg-white p-6 rounded shadow-md w-96">
        <CardElement className="p-3 border border-gray-300 rounded" />
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full disabled:opacity-50"
            disabled={!stripe || loading}
        >
            {loading ? "Processing..." : "Pay $50.00"}
        </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
    );
};

export default CheckoutPage;
