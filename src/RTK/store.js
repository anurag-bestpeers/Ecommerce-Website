import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productData from "./productSlice";
import userData from "./userSlice";

const persistConfig = {
  key: "redux-persist-config",
  storage,
};

const rootreducer = combineReducers({
  product: productData,
  user: userData,
});

const persistedReducer = persistReducer(persistConfig, rootreducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

// export default store;
export { store,persistor };
