import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./src/Slices/addtocartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;