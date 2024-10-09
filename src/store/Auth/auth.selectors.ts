import type { RootState } from "../tools";

const selectAuth = (store: RootState) => store.auth;
export const selectIsCreateAccountLoading = (store: RootState) =>
  selectAuth(store).createAccountLoading;
export const selectIsLoginAccountLoading = (store: RootState) =>
  selectAuth(store).loginAccountLoading;
export const selectIsLogged = (store: RootState) => selectAuth(store).isLogged;
export const selectIsLoginSignerLoading = (store: RootState) =>
  selectAuth(store).loginSignerLoading;
export const selectIsAccountCreation = (store: RootState) =>
  selectAuth(store).isAccountCreation;
export const selectInitiateResetPasswordLoading = (store: RootState) =>
  selectAuth(store).initiateResetPasswordLoading;
export const selectInitiateResetPasswordSuccess = (store: RootState) =>
  selectAuth(store).isInitiateResetPasswordSuccess;
export const selectResetPasswordSuccess = (store: RootState) =>
  selectAuth(store).isResetPasswordSuccess;
export const selectResetPasswordLoading = (store: RootState) =>
  selectAuth(store).resetPasswordLoading;
