import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productData from "./productSlice";
import userData from "./userSlice";

const rootreducer=combineReducers({
  product:productData,
  user:userData
})

export const store=configureStore({
    reducer:rootreducer
})