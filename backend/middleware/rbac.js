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

    const userId = req.auth_user

    const { restaurant_id } = req.body
console.log(userId?.toString(), restaurant_id, 'restaurant id')

    const restaurant = await Restaurant.findById(restaurant_id).lean()

        // const restaurant = await Restaurant.find({ creator: user._id, status: 'ACCEPTED' });

    if (!restaurant_id) {
        return res.status(401).json({ error: 'Unauthorized: Restauirant not found' });
    } else {
     

        if (userId?.toString() &&!restaurant_id) {
            return res.status(401).json({ error: 'Unauthorized: User is nto memebr of this restaurant' });
        } else {
            next()
        }
    }


}



module.exports = { isAdmin, isRestaurant }