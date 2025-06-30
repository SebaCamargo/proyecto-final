import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {}, 
  reducers: {
    addOrder: (state, action) => {
      const { userId, order } = action.payload;
      
      if (!state[userId]) {
        state[userId] = [];
      }
      
      state[userId].push(order);
    },
    
    clearAllUserData: (state) => {
      return {};
    }
  },
});

export const { addOrder, clearAllUserData } = ordersSlice.actions;
export default ordersSlice.reducer;