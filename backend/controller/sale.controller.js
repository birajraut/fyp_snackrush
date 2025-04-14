const Sales = require('../models/Sales');
const {createSaleService, getSaleService} = require('../service/sales.service')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const {payment_id, products} = req.body || {}


        if(!payment_id){
  const salePromises = products?.map((item) => {
                const saleData = new Sales({
                    product_id: item.product_id,
                    quantity: 1,
                    sale_date: Date.now(),
                    payment_status: 'Cash On Delivery',
                });

                return saleData.save(); // Return the promise to be awaited
            });
            const savedSales = await Promise.all(salePromises);
          
            res.json({
                result:savedSales
            })
            // return savedSales;

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