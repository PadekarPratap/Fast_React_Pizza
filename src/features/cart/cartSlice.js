import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // action.payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // action.payload = item.pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty: (state, action) => {
      // action.payload = item.pizzaId
      let item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty: (state, action) => {
      // action.payload = item.pizzaId
      let item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  decreaseItemQty,
  increaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// the state here is global state
export const getTototalPrice = (state) =>
  state.cart.cart.reduce((acc, currItem) => acc + currItem.totalPrice, 0);

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((acc, currItem) => acc + currItem.quantity, 0);
