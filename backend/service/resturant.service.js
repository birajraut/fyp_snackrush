const {uploadCloudinary} = require('../config/cloudinary')
const Restaurant = require('../models/Restaurant')
const { sendEmail } = require("../helper/nodemailer");
const { generateAccessToken, generateRefreshToken } = require("../helper/jwt");



const bcrypt = require('bcrypt')
const createResturantService = async (data)=>{
    const {name, email, password } = data


   

    const hash = bcrypt.hashSync(password, 10)

    const newData = {
        name, email, password: hash
    }


     const newResturant = new Restaurant(newData);
     const res = newResturant.save()
    
     const text = `Your password is ${password}`
     await sendEmail(email, 'Resturant login Creds,', text)

    return res
}

const listResturantService = async ()=>{

    const resturant = await Restaurant.find({})
    return resturant
}

const restaurantDetailsService = async (id)=>{
    const details = Restaurant.findById(id)
    if(!details){
        throw new Error('Restaurantr not found')
    }else{
        return details
    }
  
}


const restaurantLoginService = async ( email, password )=>{

    const restaurant = await Restaurant.findOne({email})
    if(!restaurant){
        throw new Error('Restaurantr not found')
    }else{
        const hash = bcrypt.compareSync(password, restaurant.password)
        if(!hash){
            throw new Error('Password do not match')
        }else{

            const payload = {
                id: restaurant._id,
              };
              const accessToken = generateAccessToken(payload);
            
              const returnData = {
                accessToken,
                restaurant:{
                    id:restaurant._id,
                    name:restaurant.name,
                },
              }
            return returnData
        }
    }

}

module.exports = {createResturantService, listResturantService, restaurantDetailsService, restaurantLoginService}