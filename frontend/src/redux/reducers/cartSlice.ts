// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IUserResponse } from '../../types/user';

// // Define the type for a single cart item (with quantity support)
// type CartItem = IUserResponse & { quantity: number };

// const initialState = {
//   cart: [] as CartItem[],
// };

// const cartSlice = createSlice({
//   name: 'cartSlice',
//   initialState,
//   reducers: {


//     addToCartSlice: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.cart.find((item) => item._id === action.payload._id);

//       if (existingItem) {
//         // Update quantity from payload
//         existingItem.quantity = action.payload.quantity;
//       } else {
//         // Add new item with the given quantity
//         state.cart.push(action.payload);
//       }
//     },

//     // Resets the cart (no need for a payload)
//     resetCart: (state) => {
//       state.cart = [];
//     },

//     // Removes an item or decreases quantity if greater than 1
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       // Find the index of the item
//       const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

//       if (itemIndex !== -1) {
//         // If the item is found, remove it from the cart by creating a new array
//         state.cart = state.cart.filter((item) => item._id !== action.payload);
//       }
//     },
//     // Increase quantity of an item
//     increaseQuantity: (state, action: PayloadAction<string>) => {
//       const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

//       if (itemIndex !== -1) {
//         const item = state.cart[itemIndex];
//         state.cart[itemIndex] = { ...item, quantity: item.quantity + 1 }; // Create a new object for the updated item
//       }
//     },

//     // Decrease quantity of an item
//     decreaseQuantity: (state, action: PayloadAction<string>) => {
//       const itemIndex = state.cart.findIndex((item) => item._id === action.payload);
//       console.log(itemIndex, action.payload, 'cart decrease item');
//       if (itemIndex !== -1) {
//         const item = state.cart[itemIndex];

//         if (item.quantity > 1) {
//           state.cart[itemIndex] = { ...item, quantity: item.quantity - 1 }; // Create a new object with updated quantity
//         }
//       }
//     },
//   },
// });

// // Export actions
// export const { addToCartSlice, resetCart, removeFromCart, increaseQuantity, decreaseQuantity } =
//   cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a single cart item
type CartItem = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart or increase its quantity
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item._id === action.payload._id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Add the item to the cart with the specified quantity
        state.cart.push(action.payload);
      }
    },

    // Remove an item from the cart or decrease its quantity
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];

        if (item.quantity > 1) {
          // Decrease the quantity if it's greater than 1
          item.quantity -= 1;
        } else {
          // Remove the item from the cart if the quantity is 1
          state.cart.splice(itemIndex, 1);
        }
      }
    },

    // Reset the cart (clear all items)
    resetCart: (state) => {
      state.cart = [];
    },

    // Increase the quantity of an item
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.cart[itemIndex] = { ...item, quantity: item.quantity + 1 };
      }
    },

    // Decrease the quantity of an item
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];

        if (item.quantity > 1) {
          state.cart[itemIndex] = { ...item, quantity: item.quantity - 1 };
        } else {
          // Remove the item if the quantity reaches 0
          state.cart.splice(itemIndex, 1);
        }
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;