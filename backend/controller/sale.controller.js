const {createSaleService, getSaleService} = require('../service/sales.service')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const {payment_id, products} = req.body || {}
        const resp = await createSaleService(userId,payment_id,products)
        res.json({
            result:resp
        })
    } catch (error) {
        next(error)
    }
}
const getSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const resp = await getSaleService(userId)
        res.json({
            result:resp
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {createSale,getSale}