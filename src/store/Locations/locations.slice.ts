import { createSlice } from "@reduxjs/toolkit";
import { LocationCategory } from "@satlantis/api-client";

import { shouldGetLocationsCategories } from "./locations.thunks";

interface LocationState {
  locationsCategories: LocationCategory[];
  locationsCategoriesLoading: boolean;
}

const initialState: LocationState = {
  locationsCategories: [],
  locationsCategoriesLoading: false,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    logout: (state) => {
      state.locationsCategories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldGetLocationsCategories.fulfilled, (state, action) => {
      state.locationsCategoriesLoading = false;
      state.locationsCategories = action.payload;
    });
    builder.addCase(shouldGetLocationsCategories.pending, (state) => {
      state.locationsCategoriesLoading = true;
    });
    builder.addCase(shouldGetLocationsCategories.rejected, (state) => {
      state.locationsCategoriesLoading = false;
    });
  },
});

export const { actions, reducer } = locationSlice;
