const { createResturantService, listResturantService, restaurantDetailsService, restaurantLoginService } = require('../service/resturant.service')
const createResturant = async (req, res, next) => {
    try {
        const logo = req.file
        const userId = req.auth_user
        const { name, description, address,lat,lng } = req.body
        const data = {
            name, description, address, userId,lat,lng
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



module.exports = { createResturant, listResturant, restaurantDetails, restaurantLogin }