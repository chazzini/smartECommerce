import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
  uid: string;
}

interface InitialState {
  user: User | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      AsyncStorage.setItem("user-data", JSON.stringify(action.payload));
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user-data");
    },
  },
});

export const { setUser, clearUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
