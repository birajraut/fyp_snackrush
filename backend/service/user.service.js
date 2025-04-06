const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const userDetailsService = async (id) => {
    // Fetch the user by their ID
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    // Fetch the restaurant associated with the user (via the creator field in Restaurant model)
    const restaurant = await Restaurant.find({ creator: user._id });

    if (!restaurant) {
        throw new Error("Restaurant not found for this user");
    }

    // Return both user and restaurant
    return { user, restaurant };
}

module.exports = { userDetailsService };
