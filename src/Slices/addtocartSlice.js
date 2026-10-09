import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");

    return {
      cartItems: savedCart ? JSON.parse(savedCart) : [],
    };
  } catch {
    return { cartItems: [] };
  }
};

const addtocartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    
    CardSlice: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Increase quantity
    incrementcart: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease quantity
    decrementcart: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload.id
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Delete product
    deletecart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
    },

    // Clear all cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  CardSlice,
  incrementcart,
  decrementcart,
  deletecart,
  clearCart,
} = addtocartSlice.actions;

export default addtocartSlice.reducer;