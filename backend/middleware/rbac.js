const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const isAdmin = async (req, res, next) => {

    const userId = req.auth_user

    const user = await User.findById(userId)
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
    } else {

        if (user.role === 'ADMIN') {
            next()
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }

    }
}


const isRestaurant = async (req, res, next) => {

    const { restaurant_id } = req.body

    const restaurant = await Restaurant.findById(restaurant_id)

    if (!restaurant) {
        return res.status(401).json({ error: 'Unauthorized: Restauirant not found' });
    } else {
        const userId = req.auth_user

        if (userId !== restaurant.creator) {
            return res.status(401).json({ error: 'Unauthorized: User is nto memebr of this restaurant' });
        } else {
            next()
        }
    }


}



module.exports = { isAdmin, isRestaurant }