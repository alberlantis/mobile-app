import type { RootState } from "../tools";

const selectProfileState = (store: RootState) => store.regular.profile;
export const selectProfile = (store: RootState) =>
  selectProfileState(store).profile;
export const selectProfileLoading = (store: RootState) =>
  selectProfileState(store).profileLoading;
