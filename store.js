
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/Slices/addtocartSlice";
import wishlistReducer from "./src/Slices/wishlistSlice";
const cartPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const cartItems = store.getState().cart?.cartItems;

  if (cartItems) {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Cart save failed:", error);
    }
  }

  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
     wishlist: wishlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistenceMiddleware),
});


store.subscribe(() => {
  try {
    const wishlistItems =
      store.getState().wishlist?.wishlistItems || [];

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );
  } catch (error) {
    console.error("Failed to save wishlist:", error);
  }
});
export default store;

