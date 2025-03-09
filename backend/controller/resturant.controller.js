const {createResturantService}  = require('../service/resturant.service')
const createResturant = async (req, res, next)=>{
    try {
        const logo = req.file
        const {name, description} = req.body
        const data = {
            logo, name, description
        }
        const resp = await createResturantService(data)
        res.json({
            result:resp,
            message:'Resturant Created'
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {createResturant}