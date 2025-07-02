import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface AuthState {
  currentUser: AppUser | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;