import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  shouldCreateAccount,
  shouldLoginAccount,
  shouldLoginSigner,
  shouldPostInitializeResetPassword,
  shouldPostResetPassword,
} from "./auth.thunks";

interface AuthState {
  createAccountLoading: boolean;
  loginAccountLoading: boolean;
  loginSignerLoading: boolean;
  isLogged: boolean;
  isAccountCreation: boolean;
  isInitiateResetPasswordSuccess: boolean;
  initiateResetPasswordLoading: boolean;
  isResetPasswordSuccess: boolean;
  resetPasswordLoading: boolean;
}

const initialState: AuthState = {
  createAccountLoading: false,
  loginAccountLoading: false,
  loginSignerLoading: false,
  isLogged: false,
  isAccountCreation: false,
  isInitiateResetPasswordSuccess: false,
  initiateResetPasswordLoading: false,
  isResetPasswordSuccess: false,
  resetPasswordLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAccountCreation = false;
      state.isLogged = false;
    },
    shouldResetInitiateResetPassword: (state) => {
      state.isInitiateResetPasswordSuccess = false;
    },
    shouldResetResetPassword: (state) => {
      state.isResetPasswordSuccess = false;
    },
    setAccountCreation: (state, action: PayloadAction<boolean>) => {
      state.isAccountCreation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldCreateAccount.fulfilled, (state, action) => {
      state.isAccountCreation = action.payload;
      state.createAccountLoading = false;
    });
    builder.addCase(shouldCreateAccount.pending, (state) => {
      state.createAccountLoading = true;
    });
    builder.addCase(shouldCreateAccount.rejected, (state) => {
      state.createAccountLoading = false;
      state.isAccountCreation = false;
    });
    builder.addCase(shouldLoginAccount.fulfilled, (state, action) => {
      state.loginAccountLoading = false;
      state.isLogged = true;
    });
    builder.addCase(shouldLoginAccount.pending, (state) => {
      state.loginAccountLoading = true;
    });
    builder.addCase(shouldLoginAccount.rejected, (state) => {
      state.loginAccountLoading = false;
      state.isLogged = false;
    });
    builder.addCase(shouldLoginSigner.fulfilled, (state, action) => {
      state.loginSignerLoading = false;
      state.isLogged = true;
    });
    builder.addCase(shouldLoginSigner.pending, (state) => {
      state.loginSignerLoading = true;
    });
    builder.addCase(shouldLoginSigner.rejected, (state) => {
      state.loginSignerLoading = false;
      state.isLogged = false;
    });
    builder.addCase(
      shouldPostInitializeResetPassword.fulfilled,
      (state, action) => {
        state.initiateResetPasswordLoading = false;
        state.isInitiateResetPasswordSuccess = action.payload;
      },
    );
    builder.addCase(shouldPostInitializeResetPassword.pending, (state) => {
      state.initiateResetPasswordLoading = true;
    });
    builder.addCase(shouldPostInitializeResetPassword.rejected, (state) => {
      state.initiateResetPasswordLoading = false;
    });
    builder.addCase(shouldPostResetPassword.fulfilled, (state, action) => {
      state.resetPasswordLoading = false;
      state.isResetPasswordSuccess = action.payload;
    });
    builder.addCase(shouldPostResetPassword.pending, (state) => {
      state.resetPasswordLoading = true;
    });
    builder.addCase(shouldPostResetPassword.rejected, (state) => {
      state.resetPasswordLoading = false;
    });
  },
});

export const { actions, reducer } = authSlice;
