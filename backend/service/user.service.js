const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Sales = require("../models/Sales");
const Product = require("../models/Product");

const userDetailsService = async (id) => {
    // Fetch the user by their ID
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    // Fetch the restaurant associated with the user (via the creator field in Restaurant model)
    const restaurant = await Restaurant.find({ creator: user._id, status: 'ACCEPTED' });

    if (!restaurant) {
        throw new Error("Restaurant not found for this user");
    }

    // Return both user and restaurant
    return { user, restaurant };
}

const userOrderDetailsService = async (id) => {
    // Fetch orders for the user
    const orders = await Sales.find({ user_id: id });

    if (!orders || orders.length === 0) {
        throw new Error("No orders found for this user");
    }

    // Fetch detailed product and restaurant information for each order
    const refinedOrders = await Promise.all(
        orders.map(async (order) => {
            const refinedProducts = await Promise.all(
                order.products.map(async (productItem) => {
                    const product = await Product.findById(productItem.product_id);
                    if (!product) {
                        throw new Error("Product not found");
                    }

                    const restaurant = await Restaurant.findById(product.restaurant_id);
                    if (!restaurant) {
                        throw new Error("Restaurant not found for this product");
                    }

                    // Return refined product details
                    return {
                        product_id: productItem.product_id,
                        quantity: productItem.quantity,
                        price: productItem.price,
                        product: {
                            _id: product._id,
                            name: product.name,
                            image: product.image,
                            description: product.description,
                            price: product.price,
                            restaurant: {
                                _id: restaurant._id,
                                name: restaurant.name,
                                address: restaurant.address,
                                lat: restaurant.lat,
                                lng: restaurant.lng,
                                description: restaurant.description,
                                status: restaurant.status,
                                image: restaurant.image,
                                updatedAt: restaurant.updatedAt,
                            },
                        },
                    };
                })
            );

            // Return refined order details
            return {
                _id: order._id,
                user_id: order.user_id,
                products: refinedProducts,
                total_cost: order.total_cost,
                payment_status: order.payment_status,
                sale_date: order.sale_date,
            };
        })
    );

    return refinedOrders;
};

module.exports = { userDetailsService, userOrderDetailsService };
