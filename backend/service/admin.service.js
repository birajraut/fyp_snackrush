
const Restaurant = require("../models/Restaurant");
const adminRestaurantListService = async (status) => {
    const restaurants = status ? await Restaurant.find({ status }).populate('creator').lean() : await Restaurant.find().populate('creator').lean();
    return restaurants
}
const adminRestaurantUpdateService = async (status, restaurant_id) => {

    const res = await Restaurant.updateOne({ _id: restaurant_id }, { status: status })
    return res
}
module.exports = { adminRestaurantListService, adminRestaurantUpdateService }