const Product = require('../models/Product');
const Sales = require('../models/Sales');
const {createSaleService, getSaleService,updateDeliveryStatusService} = require('../service/sales.service')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSale = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const {payment_id, products,restaurant_id} = req.body || {}

console.log("products found:", products,payment_id,restaurant_id);
        if (!payment_id) {
          let totalCost = 0;
          const saleItems = [];
      

          for (const item of products) {
            const product = await Product.findById(item.product_id);
            if (!product) throw new Error(`Product not found: ${item.product_id}`);
      
            const quantity = Math.round(item.price / product.price);
            if (quantity < 1) throw new Error("Invalid quantity derived from price");
      
            totalCost += item.price;
      
            saleItems.push({
              product_id: product._id,
              quantity,
              price: product.price,
            });
      
            // Charge per item or once for totalCost depending on your logic
            // await chargeCard(customerId, paymentMethodId, item.price);
          }
      
          const saleData = new Sales({
            products: saleItems,
            total_cost: totalCost,
            payment_status: "Cash On Delivery",
            delivery_status: "Cooking",
      
            user_id: userId,
            restaurant_id: restaurant_id, // Include restaurant_id
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
