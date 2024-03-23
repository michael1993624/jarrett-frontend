import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, ACCOUNT_ID } from "../../libs/contants";

export const initialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN) || null,
  currentUser: null,
  accounts: [],
  account: localStorage.getItem(ACCOUNT_ID) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { payload } = action;
      state.accessToken = payload;
      localStorage.setItem(ACCESS_TOKEN, payload);
    },
    setCurrentUser: (state, action) => {
      const { payload } = action;
      state.currentUser = payload;
    },
    setAccount: (state, action) => {
      const { payload } = action;
      state.account = payload;
      localStorage.setItem(ACCOUNT_ID, payload);
    },
    setAccounts: (state, action) => {
      const { payload } = action;
      state.accounts = payload;
    },
  },
});

export const { 
  setToken,
  setCurrentUser,
  setAccount,
  setAccounts
} = authSlice.actions;

export default authSlice.reducer;
