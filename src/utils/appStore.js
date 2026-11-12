// configureStore: creates the Redux store (with sensible defaults and dev tools)
import { configureStore } from "@reduxjs/toolkit";
// cartReducer: the cart slice's reducer (handles add, qty change, clear)
import cartReducer from "./cartSlice";

// The app's single Redux store
const appStore = configureStore({
  // Each key becomes a slice of state: store.cart -> { items: [...] }
  reducer: {
    cart: cartReducer,
  },
});

export default appStore; // Provided to the app via <Provider store={appStore}>