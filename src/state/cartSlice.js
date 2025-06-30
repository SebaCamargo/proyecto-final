import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { userId, movie } = action.payload;
      
      if (!state[userId]) {
        state[userId] = [];
      }
      
      const exists = state[userId].find(item => item.id === movie.id);
      
      if (exists) {
        exists.quantity += 1;
      } else {
        state[userId].push({ ...movie, quantity: 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      const { userId, movieId } = action.payload;
      
      if (state[userId]) {
        state[userId] = state[userId].filter(item => item.id !== movieId);
      }
    },
    
    increaseQuantity: (state, action) => {
      const { userId, movieId } = action.payload;
      
      if (state[userId]) {
        const movie = state[userId].find(item => item.id === movieId);
        if (movie) {
          movie.quantity += 1;
        }
      }
    },
    
    decreaseQuantity: (state, action) => {
      const { userId, movieId } = action.payload;
      
      if (state[userId]) {
        const movie = state[userId].find(item => item.id === movieId);
        if (movie && movie.quantity > 1) {
          movie.quantity -= 1;
        } else {
          state[userId] = state[userId].filter(item => item.id !== movieId);
        }
      }
    },
    
    clearCart: (state, action) => {
      const { userId } = action.payload;
      if (state[userId]) {
        state[userId] = [];
      }
    },
    
    clearAllUserData: (state) => {
      return {};
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  clearAllUserData 
} = cartSlice.actions;

export default cartSlice.reducer;