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

      const exists = state[userId].find((item) => item.id === movie.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        state[userId].push({ ...movie, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { userId, movieId } = action.payload;

      if (state[userId]) {
        state[userId] = state[userId].filter((item) => item.id !== movieId);
      }
    },

    increaseQuantity: (state, action) => {
      const { userId, movieId } = action.payload;

      if (state[userId]) {
        const movie = state[userId].find((item) => item.id === movieId);
        if (movie) {
          movie.quantity += 1;
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const { userId, movieId } = action.payload;

      if (state[userId]) {
        const movie = state[userId].find((item) => item.id === movieId);
        if (movie && movie.quantity > 1) {
          movie.quantity -= 1;
        } else {
          state[userId] = state[userId].filter((item) => item.id !== movieId);
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
    },

    // Nueva acción para transferir el carrito de invitado al usuario logueado
    transferGuestCart: (state, action) => {
      const { userId } = action.payload;
      const guestCart = state["guest"] || [];

      if (guestCart.length > 0) {
        if (!state[userId]) {
          state[userId] = [];
        }

        // Transferir cada item del carrito de invitado al carrito del usuario
        guestCart.forEach((guestItem) => {
          const existingItem = state[userId].find(
            (item) => item.id === guestItem.id
          );
          if (existingItem) {
            existingItem.quantity += guestItem.quantity;
          } else {
            state[userId].push({ ...guestItem });
          }
        });

        // Limpiar el carrito de invitado
        delete state["guest"];
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  clearAllUserData,
  transferGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;
