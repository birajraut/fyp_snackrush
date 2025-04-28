const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Order = require("../models/Sales");
const adminDashboardService = async () => {
    const [totalOrders, totalCustomers, revenue, topDish, recentOrders] = await Promise.all([
        Order.countDocuments(),
        User.countDocuments({ role: "USER" }),
        Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$total_cost" },
                },
            },
        ]),
        Order.aggregate([
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.product_id",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $limit: 1,
            },
        ]),
        Order.find({}, { __v: 0 })
            .populate({ path: "user_id", model: "User" })
            .populate({ path: "restaurant_id", model: "Restaurant" })
            .populate({
                path: "products.product_id",
                model: "Product",
            })
            .limit(10)
            .lean(),
    ]);

    return {
        totalOrders,
        totalCustomers,
        revenue: revenue[0]?.total || 0,
        topDish: topDish[0]?._id || "N/A",
        recentOrders,
    };
};
const adminRestaurantListService = async (status) => {
    const restaurants = status ? await Restaurant.find({ status }).populate('creator').lean() : await Restaurant.find().populate('creator').lean();
    return restaurants
}
const adminRestaurantUpdateService = async (status, restaurant_id) => {

    const res = await Restaurant.updateOne({ _id: restaurant_id }, { status: status })
    return res
}
module.exports = { adminDashboardService, adminRestaurantListService, adminRestaurantUpdateService }
