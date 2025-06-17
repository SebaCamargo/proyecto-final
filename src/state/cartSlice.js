import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const movie = action.payload;
      const exists = state.find(item => item.id === movie.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        state.push({ ...movie, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const movie = state.find(item => item.id === action.payload);
      if (movie) {
        movie.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const movie = state.find(item => item.id === action.payload);
      if (movie && movie.quantity > 1) {
        movie.quantity -= 1;
      } else {
        return state.filter(item => item.id !== action.payload);
      }
    },
    clearCart: () => {
      return [];
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
