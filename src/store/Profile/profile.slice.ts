import { createSlice } from "@reduxjs/toolkit";

import { shouldFetchProfile } from "./profile.thunks";
interface ProfileState {
  profile: undefined;
  profileLoading: boolean;
}

const initialState: ProfileState = {
  profile: undefined,
  profileLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shouldFetchProfile.fulfilled, (state) => {
      state.profileLoading = false;
      state.profile = undefined;
    });
    builder.addCase(shouldFetchProfile.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(shouldFetchProfile.rejected, (state) => {
      state.profileLoading = false;
    });
  },
});

export const { actions, reducer } = profileSlice;
