const Sales = require('../models/Sales');
const {createSaleService, getSaleService} = require('../service/sales.service')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const {payment_id, products} = req.body || {}


        if (!payment_id) {
            const totalCost = products?.reduce((sum, item) => sum + item.price * item.quantity, 0);
          
            const saleData = new Sales({
              products: products.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
              })),
              total_cost: totalCost,
              payment_status: 'Cash On Delivery',
              user_id: userId
            });
          
            const savedSale = await saleData.save();
          
            res.json({ result: savedSale });
          }else{
            const resp = await createSaleService(userId,payment_id,products)
            res.json({
                result:resp
            })
        }
    } catch (error) {
        next(error)
    }
}
const getSale = async (req, res, next)=>{
    try {
        const {restaurant_id} = req.body || {}
        const user_id= req?.body?.user_id
        if(user_id){
            const resp = await getSaleService({user_id:user_id})
            res.json({
                result:resp
            })
        }else{
            const resp = await getSaleService({restaurant_id:restaurant_id})
            res.json({
                result:resp
            })
        }
       
    } catch (error) {
        next(error)
    }
}


module.exports = {createSale,getSale}