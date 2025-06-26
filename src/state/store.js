
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import ordersReducer from './ordersSlice';

// Combinamos los reducers de la aplicación
const rootReducer = combineReducers({
    auth: authReducer, // El estado será accesible como state.auth
    cart: cartReducer,
    orders: ordersReducer,
});

// Configuración de redux-persist
const persistConfig = {
    key: "root",          // Clave en localStorage: 'persist:root'
    storage,               // Usamos localStorage para persistencia
    whitelist: ["auth", "cart", "orders"], // Solo persistimos el slice 'auth'
};

// Envolvemos rootReducer con persistReducer para habilitar persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuramos el store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

// Creamos el persistor para controlar la persistencia del store
export const persistor = persistStore(store);
export default store;
