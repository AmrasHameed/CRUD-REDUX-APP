import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    user: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
