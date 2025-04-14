// import axios from 'axios';
const Product = require('../models/Product');

const API_URL = '/api/product'; // Adjust according to your API base URL



const listProductService = async (restaurantId) => {
  try {
    const products = await Product.find({ restaurant_id: restaurantId }).populate("restaurant_id").lean();
    const modifiedProducts = products.map(({ restaurant_id, ...rest }) => ({
      ...rest,
      restaurant: restaurant_id,
    }));
    if (!products || products.length === 0) {
      return { message: 'No products found for this restaurant' };
    }
    return modifiedProducts;
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};


const restaurantProductListService = async (restaurant_id)=>
{


  const products = await Product.find({restaurant_id})
return products
}
module.exports = { listProductService, restaurantProductListService }


// Other potential functions for future (e.g., getProduct, updateProduct)
