import { createSlice } from "@reduxjs/toolkit";
import { UserResolver, AccountPlaceRole } from "@satlantis/api-client";

import { shouldFetchProfile } from "./profile.thunks";
interface ProfileState {
  otherProfile: UserResolver | undefined;
  profileFollowings: UserResolver[];
  profileFollowedBy: UserResolver[];
  profileLoading: boolean;
  roles: AccountPlaceRole[];
}

const initialState: ProfileState = {
  otherProfile: undefined,
  profileFollowings: [],
  profileFollowedBy: [],
  profileLoading: false,
  roles: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout: (state) => {
      state.profileFollowedBy = [];
      state.profileFollowings = [];
      state.otherProfile = undefined;
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldFetchProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.otherProfile = action.payload.profile;
      state.profileFollowedBy = action.payload.followedBy;
      state.roles = action.payload.roles;
      state.profileFollowings = action.payload.followings;
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
