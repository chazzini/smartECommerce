import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  uid: string;
}

interface InitialState {
  user: User | {};
  isLogin: boolean;
}

const initialState: InitialState = {
  user: {},
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    clearUser: (state) => {
      state.user = {};
      state.isLogin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
