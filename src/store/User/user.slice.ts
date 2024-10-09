import { createSlice } from "@reduxjs/toolkit";
import {
  Interest,
  UserResolver,
  AccountPlaceRole,
  Account,
} from "@satlantis/api-client";

import {
  shouldFetchAllInterests,
  shouldPostFollowUser,
  shouldPostUnfollowUser,
  shouldFetchMyProfile,
  shouldUpdateInterests,
  shouldUpdateMyProfile,
  shouldUpdateCompleteProfile,
} from "./user.thunks";

interface UserState {
  interestsPool: Interest[];
  interestsPoolLoading: boolean;
  followUserLoading: boolean;
  unfollowUserLoading: boolean;
  updateMyProfileLoading: boolean;
  updateCompleteProfileLoading: boolean;
  updateInterestsLoading: boolean;
  myProfile: UserResolver | undefined;
  followings: UserResolver[];
  followedBy: UserResolver[];
  myProfileLoading: boolean;
  myRoles: AccountPlaceRole[];
  myAccount: Account | undefined;
}

const initialState: UserState = {
  interestsPool: [],
  interestsPoolLoading: false,
  updateInterestsLoading: false,
  followUserLoading: false,
  unfollowUserLoading: false,
  updateMyProfileLoading: false,
  updateCompleteProfileLoading: false,
  myProfileLoading: false,
  myProfile: undefined,
  followings: [],
  followedBy: [],
  myRoles: [],
  myAccount: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.myProfile = undefined;
      state.interestsPool = [];
      state.followings = [];
      state.followedBy = [];
      state.myRoles = [];
      state.myAccount = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldFetchMyProfile.fulfilled, (state, action) => {
      state.myProfile = action.payload.myProfile;
      state.followings = action.payload.followings;
      state.followedBy = action.payload.followedBy;
      state.myRoles = action.payload.myRoles;
      state.myProfileLoading = false;
      state.myAccount = action.payload.myAccount;
    });
    builder.addCase(shouldFetchMyProfile.pending, (state) => {
      state.myProfileLoading = true;
    });
    builder.addCase(shouldFetchMyProfile.rejected, (state) => {
      state.myProfileLoading = false;
    });
    builder.addCase(shouldFetchAllInterests.fulfilled, (state, action) => {
      state.interestsPoolLoading = false;
      state.interestsPool = action.payload;
    });
    builder.addCase(shouldFetchAllInterests.pending, (state) => {
      state.interestsPoolLoading = true;
    });
    builder.addCase(shouldFetchAllInterests.rejected, (state) => {
      state.interestsPoolLoading = false;
    });
    builder.addCase(shouldUpdateInterests.fulfilled, (state) => {
      state.updateInterestsLoading = false;
    });
    builder.addCase(shouldUpdateInterests.pending, (state) => {
      state.updateInterestsLoading = true;
    });
    builder.addCase(shouldUpdateInterests.rejected, (state) => {
      state.updateInterestsLoading = false;
    });
    builder.addCase(shouldUpdateMyProfile.fulfilled, (state) => {
      state.updateMyProfileLoading = false;
    });
    builder.addCase(shouldUpdateMyProfile.pending, (state) => {
      state.updateMyProfileLoading = true;
    });
    builder.addCase(shouldUpdateMyProfile.rejected, (state) => {
      state.updateMyProfileLoading = false;
    });
    builder.addCase(shouldUpdateCompleteProfile.fulfilled, (state) => {
      state.updateCompleteProfileLoading = false;
    });
    builder.addCase(shouldUpdateCompleteProfile.pending, (state) => {
      state.updateCompleteProfileLoading = true;
    });
    builder.addCase(shouldUpdateCompleteProfile.rejected, (state) => {
      state.updateCompleteProfileLoading = false;
    });
    builder.addCase(shouldPostFollowUser.fulfilled, (state) => {
      state.followUserLoading = false;
    });
    builder.addCase(shouldPostFollowUser.pending, (state) => {
      state.followUserLoading = true;
    });
    builder.addCase(shouldPostFollowUser.rejected, (state) => {
      state.followUserLoading = false;
    });
    builder.addCase(shouldPostUnfollowUser.fulfilled, (state) => {
      state.unfollowUserLoading = false;
    });
    builder.addCase(shouldPostUnfollowUser.pending, (state) => {
      state.unfollowUserLoading = true;
    });
    builder.addCase(shouldPostUnfollowUser.rejected, (state) => {
      state.unfollowUserLoading = false;
    });
  },
});

export const { actions, reducer } = userSlice;
