const { createResturantService, listResturantService, restaurantDetailsService , restaurantLoginService} = require('../service/resturant.service')
const createResturant = async (req, res, next) => {
    try {
        const logo = req.file
        const { name, email, password } = req.body
        const data = {
            name, email, password
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
        const { restaurantId } = req.params
        const resp = await restaurantDetailsService(restaurantId)
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
        const resp = await restaurantLoginService( email, password )
        res.json({
            result:resp
        })
    } catch (error) {
        next(error)
    }
}



module.exports = { createResturant, listResturant, restaurantDetails, restaurantLogin }