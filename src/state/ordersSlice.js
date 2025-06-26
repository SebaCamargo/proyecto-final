import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;