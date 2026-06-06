import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./reducer/CartSlice";
import UserSlice from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
