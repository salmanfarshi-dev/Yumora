
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/Slices/addtocartSlice";

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
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistenceMiddleware),
});

export default store;

