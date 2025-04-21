const Sales = require('../models/Sales');
const {createSaleService, getSaleService,updateDeliveryStatusService} = require('../service/sales.service')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const {payment_id, products,restaurant_id} = req.body || {}

console.log("products found:", products);
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
            const resp = await createSaleService(userId,restaurant_id,payment_id,products)
            res.json({
                result:resp
            })
        }
    } catch (error) {
        next(error)
    }
}


const getSale = async (req, res, next) => {
    try {
      const { user_id, restaurant_id } = req.body || {};
  
      // Validate input
      if (!user_id && !restaurant_id) {
        return res.status(400).json({ message: "Either user_id or restaurant_id must be provided." });
      }
  
      // Fetch sales based on user_id or restaurant_id
      const filterCriteria = {};
      if (user_id) filterCriteria.user_id = user_id;
      if (restaurant_id) filterCriteria.restaurant_id = restaurant_id;
  
      const resp = await getSaleService(filterCriteria);
      res.json({ result: resp });
    } catch (error) {
      next(error);
    }
  };

const updateDeliveryStatus = async (req, res, next) => {
    try {
      const { saleId, status } = req.body || {};

      if (!saleId || !status) {
        return res.status(400).json({ message: "saleId and status are required fields." });
      }

      const resp = await updateDeliveryStatusService(saleId, status);
      res.json({ result: resp });
    } catch (error) {
      next(error);
    }
  };

module.exports = {createSale,getSale,updateDeliveryStatus}
