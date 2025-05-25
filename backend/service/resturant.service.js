const { uploadCloudinary } = require('../config/cloudinary')
const Restaurant = require('../models/Restaurant')
const { sendEmail } = require("../helper/nodemailer");
const { generateAccessToken, generateRefreshToken } = require("../helper/jwt");



const bcrypt = require('bcrypt')
const createResturantService = async (data) => {
    const { name, description, address, userId, lat, lng, image, phone, category } = data


console.log('data and name and address', data)

    // const hash = bcrypt.hashSync(password, 10)

    const newData = {
        name, description, address,lat,lng,image, phone, category, creator: userId
    }


    const newResturant = new Restaurant(newData);
    const res = newResturant.save()

    // const text = `Your password is ${password}`
    // await sendEmail(email, 'Resturant login Creds,', text)

    return res
}

const listResturantService = async () => {

    const resturant = await Restaurant.find({status:'ACCEPTED'})
    return resturant
}

const restaurantDetailsService = async (id) => {
    const details = await Restaurant.findById(id)
    console.log('dt', details)
    if (!details) {
        throw new Error('Restaurant not found')
    } else {
        return details
    }

}


const restaurantLoginService = async (email, password) => {

    const restaurant = await Restaurant.findOne({ email })
    if (!restaurant) {
        throw new Error('Restaurant not found')
    } else {

        if (restaurant?.status !== 'ACCEPTED') {
            throw new Error('Your restaurant is not accepted by system')
        } else {
            const hash = bcrypt.compareSync(password, restaurant.password)
            if (!hash) {
                throw new Error('Password do not match')
            } else {

                const payload = {
                    id: restaurant._id,
                };
                const accessToken = generateAccessToken(payload);

                const returnData = {
                    accessToken,
                    restaurant: {
                        id: restaurant._id,
                        name: restaurant.name,
                    },
                }
                return returnData
            }
        }


    }

}




const restaurantDetailsOwenerService = async (id)=>{
    return await Restaurant.findById(id)
}

const updateRestaurantImageService = async (restaurantId, imageUrl) => {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { image: imageUrl },
      { new: true }
    );
  
    console.log(updatedRestaurant,'updated restaurant')
    if (!updatedRestaurant) {
      throw new Error('Restaurant not found');
    }
  
    return updatedRestaurant;
  };
  

module.exports = { updateRestaurantImageService,createResturantService, listResturantService, restaurantDetailsService, restaurantLoginService, restaurantDetailsOwenerService }