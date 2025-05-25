
const { createResturantService, listResturantService,   updateRestaurantImageService // ⬅️ import the new service
,restaurantDetailsService, restaurantLoginService, restaurantDetailsOwenerService } = require('../service/resturant.service')
const { uploadCloudinary } = require('../config/cloudinary')

const createResturant = async (req, res, next) => {
    try {
        const logo = req.file
        const userId = req.auth_user
        const { name, description, address,lat,lng, phone, category} = req.body
        console.log('req body', req.body)
        const image = req.file ? req.file.buffer : ''; // Assuming image is uploaded using multer
        let logoUrl = ''
        if (image) {
            const uploadCloud = await uploadCloudinary(image)
            logoUrl = uploadCloud?.url
        }
        const data = {
            name, description, address, userId,lat,lng, phone, category,   
                    image: logoUrl

        }
        const resp = await createResturantService(data)
        res.json({
            result: resp,
            message: 'Resturant Created'
        })
    } catch (error) {
        next(error)
    }
}

const listResturant = async (req, res, next) => {
    try {
        const resp = await listResturantService()
        res.json({
            result: resp,
            message: 'data featched'
        })

    } catch (error) {
        next(error)
    }
}


const restaurantDetails = async (req, res, next) => {
    try {
        const { id } = req.params
        const resp = await restaurantDetailsService(id)
        res.json({
            result: resp,
            message: 'Data Featched'
        })
    } catch (error) {
        next(error)
    }
}



const restaurantLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body || {}
        if (!email && !password) {
            throw new Error('Please provide required fields')
        }
        const resp = await restaurantLoginService(email, password)
        res.json({
            result: resp
        })
    } catch (error) {
        next(error)
    }
}



const restaurantDetailsOwener = async (req, res, next)=>{
    try {
        const {restaurant_id} = req.body || {}
        const resp = await restaurantDetailsOwenerService(restaurant_id)
        res.json({
            result: resp
        })
    } catch (error) {
        next(error)
    }
}

const updateRestaurantImage = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const image = req.file?.buffer;
  
      if (!image) {
        throw new Error("Image file is required");
      }
  
      const upload = await uploadCloudinary(image);
      if (!upload?.url) {
        throw new Error("Failed to upload image to Cloudinary");
      }
  
      const updated = await updateRestaurantImageService(restaurantId, upload.url);
  
      res.json({
        result: updated,
        message: "Restaurant image updated successfully"
      });
    } catch (error) {
      next(error);
    }
  };


module.exports = { createResturant,updateRestaurantImage, listResturant, restaurantDetails, restaurantLogin, restaurantDetailsOwener }