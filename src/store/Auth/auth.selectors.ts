import type { RootState } from "../tools";

const selectAuth = (store: RootState) => store.regular.auth;
export const selectIsCreateAccountLoading = (store: RootState) =>
  selectAuth(store).createAccountLoading;
export const selectIsAccount = (store: RootState) => selectAuth(store).account;
export const selectIsLoginAccountLoading = (store: RootState) =>
  selectAuth(store).loginAccountLoading;
export const selectIsLogged = (store: RootState) => selectAuth(store).isLogged;
export const selectIsLoginSignerLoading = (store: RootState) =>
  selectAuth(store).loginSignerLoading;