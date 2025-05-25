const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Sales = require("../models/Sales");
const Product = require("../models/Product");

const userDetailsService = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    const restaurant = await Restaurant.find({ creator: user._id, status: 'ACCEPTED' });

    if (!restaurant) {
        throw new Error("Restaurant not found for this user");
    }

    return { user, restaurant };
}

const userOrderDetailsService = async (id) => {
    const orders = await Sales.find({ user_id: id });

    if (!orders || orders.length === 0) {
        throw new Error("No orders found for this user");
    }

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

const totalUsersService = async () => {
    const totalUsers = await User.find();
    return totalUsers;
};

module.exports = { userDetailsService, userOrderDetailsService, totalUsersService };

