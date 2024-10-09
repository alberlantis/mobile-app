import type { RootState } from "../tools";

const selectNostr = (store: RootState) => store.nostr;
export const selectPrivateKey = (store: RootState) =>
  selectNostr(store).privateKey;
export const selectIsGenerateSignerLoading = (store: RootState) =>
  selectNostr(store).generateSignerLoading;
export const selectToken = (store: RootState) => selectNostr(store).token;
export const selectIsTokenExpired = (store: RootState) =>
  selectNostr(store).isTokenExpired;
