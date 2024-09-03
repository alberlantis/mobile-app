import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "@satlantis/api-client";

import {
  shouldCreateAccount,
  shouldLoginAccount,
  shouldLoginSigner,
} from "./auth.thunks";

interface AuthState {
  createAccountLoading: boolean;
  loginAccountLoading: boolean;
  loginSignerLoading: boolean;
  isLogged: boolean;
  isAccountCreation: boolean;
  account: Account | undefined;
}

const initialState: AuthState = {
  createAccountLoading: false,
  loginAccountLoading: false,
  loginSignerLoading: false,
  isLogged: false,
  account: undefined,
  isAccountCreation: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccountCreation: (state, action: PayloadAction<boolean>) => {
      state.isAccountCreation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldCreateAccount.fulfilled, (state) => {
      state.createAccountLoading = false;
    });
    builder.addCase(shouldCreateAccount.pending, (state) => {
      state.createAccountLoading = true;
    });
    builder.addCase(shouldCreateAccount.rejected, (state) => {
      state.createAccountLoading = false;
    });
    builder.addCase(shouldLoginAccount.fulfilled, (state, action) => {
      state.loginAccountLoading = false;
      state.account = action.payload;
      state.isLogged = true;
    });
    builder.addCase(shouldLoginAccount.pending, (state) => {
      state.loginAccountLoading = true;
    });
    builder.addCase(shouldLoginAccount.rejected, (state) => {
      state.loginAccountLoading = false;
      state.account = undefined;
      state.isLogged = false;
    });
    builder.addCase(shouldLoginSigner.fulfilled, (state, action) => {
      state.loginSignerLoading = false;
      state.account = action.payload;
      state.isLogged = true;
    });
    builder.addCase(shouldLoginSigner.pending, (state) => {
      state.loginSignerLoading = true;
    });
    builder.addCase(shouldLoginSigner.rejected, (state) => {
      state.loginSignerLoading = false;
      state.isLogged = false;
      state.account = undefined;
    });
  },
});

export const { actions, reducer } = authSlice;
