const {uploadCloudinary} = require('../config/cloudinary')
const Restaurant = require('../models/Restaurant')
const createResturantService = async (data)=>{
    const {logo, name, description} = data
    const uploadCloud = await uploadCloudinary(logo.buffer)
    console.log(uploadCloud.url)

    const newData = {
        name, 
        description, 
        image:uploadCloud?.url
    }

     const newResturant = new Restaurant(newData);
     const res = newResturant.save()

    return res
}

module.exports = {createResturantService}