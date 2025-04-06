// src/services/productService.ts
import axios from 'axios';
import { authApi } from './axios';

// API endpoint for creating a new product
const API_URL = '/product'; // Adjust the API URL if needed

// Function to create a new product (menu item)

export const listProduct = async (id: string) => {
  try {
    const response = await authApi.get(API_URL + `/${id}`);

    return response; // Return the response data (you can adjust this based on your backend response)
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

export const createProduct = async (data: any) => {
  return await authApi.post('product', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
