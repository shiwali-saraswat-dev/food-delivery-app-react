// createSlice: bundles state, reducers and actions for one feature into a single object
import { createSlice } from "@reduxjs/toolkit";

// Helper: reads the item id from the Swiggy item shape
const getId = (item) => item?.card?.info?.id;

const cartSlice = createSlice({
  name: "cart",
  // Initial cart state: no items
  initialState: {
    items: [], // "Pizza", "Burger"
  },
  // Reducers: each one becomes an action. Mutating "state" is safe here (Immer handles immutability)
  reducers: {
    // Add from the menu page: same dish → qty + 1, new dish → push with qty 1
    addItem: (state, action) => {
      const id = getId(action.payload);
      const existing = id != null && state.items.find((i) => getId(i) === id);

      if (existing) {
        existing.qty = (existing.qty ?? 1) + 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 }); // copy, so the original payload isn't mutated
      }
    },

    // "+" button in the cart (payload = item id)
    increaseQty: (state, action) => {
      const item = state.items.find((i) => getId(i) === action.payload);
      if (item) item.qty = (item.qty ?? 1) + 1;
    },

    // "−" button in the cart: qty - 1, and remove the row when it would hit 0
    decreaseQty: (state, action) => {
      const index = state.items.findIndex((i) => getId(i) === action.payload);
      if (index === -1) return; // item not in cart

      const item = state.items[index];
      if ((item.qty ?? 1) > 1) {
        item.qty = (item.qty ?? 1) - 1;
      } else {
        state.items.splice(index, 1);
      }
    },

    // Removes the whole row by id, whatever its qty
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => getId(i) !== action.payload);
    },

    // Empties the cart (returning a new object replaces the whole state)
    // originalState = {items: ["pizza"]}
    clearCart: (state, action) => {
      //RTK - either Mutate the existing  state or return a new State
      // state.items.length = 0; // originalState = []

      return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

// Action creators, used with dispatch() in components
export const { addItem, increaseQty, decreaseQty, removeItem, clearCart } =
  cartSlice.actions;

// The reducer, registered in appStore
export default cartSlice.reducer;