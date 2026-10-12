
import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: getInitialWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlistItems.some(
        (item) => item.id === product.id
      );

      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.wishlistItems.push(product);
      }
    },

    removeWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const {
  toggleWishlist,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
