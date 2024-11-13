import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {persistReducers, persistStore } from 'redux-persist'
import productData from "./productSlice";
import userData from "./userSlice";

const rootreducer = combineReducers({
  product: productData,
  user: userData,
});

export const store = configureStore({
  reducer: rootreducer,
});
