import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import adminReducer from './slices/adminSlice';
import counterReducer from './slices/counter'

const store = configureStore({
  reducer: {
    user: authReducer,
    admin: adminReducer,
    counter:counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
