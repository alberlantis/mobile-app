import type { RootState } from "../tools";

const selectLocationsState = (store: RootState) => store.locations;
export const selectLocationsCategories = (store: RootState) =>
  selectLocationsState(store).locationsCategories;
export const selectLocationsCategoriesLoading = (store: RootState) =>
  selectLocationsState(store).locationsCategoriesLoading;
