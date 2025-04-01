// import axios from 'axios';
const Product = require('../models/Product');

const API_URL = '/api/product'; // Adjust according to your API base URL



const listProductService = async (restaurantId) => {
    console.log(restaurantId,'res id from req from db')


    try {
      // Query the Product collection where the restaurant_id matches the given restaurantId
      const products =  Product.find({ restaurant_id: restaurantId });
  console.log(products,restaurantId,'products from db')
      if (!products || products.length === 0) {
        // If no products are found, return a custom message
        return { message: 'No products found for this restaurant' };
      }
  
      return products; // Return the list of products found for the restaurant
    } catch (error) {
      // Handle any errors that occur during the database query
      throw new Error('Error fetching products: ' + error.message);
    }
  };

module.exports = { listProductService}


// Other potential functions for future (e.g., getProduct, updateProduct)
