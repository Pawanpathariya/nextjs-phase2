import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { add } from "./cartSlice";
import favSlice from './favSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);
const persistedReducer1 = persistReducer(persistConfig, favSlice);

const store = configureStore({
  reducer: {
    addtocart: persistedReducer,
    addtofav:persistedReducer1
  }
});

export const persistor = persistStore(store);
export default store;

