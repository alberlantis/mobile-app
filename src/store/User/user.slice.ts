import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interest, Account } from "@satlantis/api-client";

import {
  shouldFetchAllInterests,
  shouldPostFollowUser,
  shouldPostUnfollowUser,
  shouldFetchAccount,
  shouldPutUpdateAccount,
  shouldPostFollowPubKeys,
  shouldUpdateCompleteProfile,
  shouldGetMyInterests,
  shouldUpdateMyInterests,
} from "./user.thunks";

interface UserState {
  interestsPool: Interest[];
  interestsPoolLoading: boolean;
  account: Account | undefined;
  otherUserAccount: Account | undefined;
  followUserLoading: boolean;
  unfollowUserLoading: boolean;
  getAccountLoading: boolean;
  updateAccountLoading: boolean;
  followPubKeysLoading: boolean;
  updateCompleteProfileLoading: boolean;
  myInterests: string[];
  myInterestsLoading: boolean;
  updatingMyInterests: boolean;
}

const initialState: UserState = {
  interestsPool: [],
  interestsPoolLoading: false,
  account: undefined,
  followUserLoading: false,
  unfollowUserLoading: false,
  getAccountLoading: false,
  updateAccountLoading: false,
  followPubKeysLoading: false,
  updateCompleteProfileLoading: false,
  otherUserAccount: undefined,
  myInterests: [],
  myInterestsLoading: false,
  updatingMyInterests: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = undefined;
      state.otherUserAccount = undefined;
      state.myInterests = [];
    },
    shouldSetAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    shouldSetOtherUserAccount: (state, action: PayloadAction<Account>) => {
      state.otherUserAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(shouldFetchAccount.fulfilled, (state) => {
      state.getAccountLoading = false;
    });
    builder.addCase(shouldFetchAccount.pending, (state) => {
      state.getAccountLoading = true;
    });
    builder.addCase(shouldFetchAccount.rejected, (state) => {
      state.getAccountLoading = false;
    });
    builder.addCase(shouldPutUpdateAccount.fulfilled, (state) => {
      state.updateAccountLoading = false;
    });
    builder.addCase(shouldPutUpdateAccount.pending, (state) => {
      state.updateAccountLoading = true;
    });
    builder.addCase(shouldPutUpdateAccount.rejected, (state) => {
      state.updateAccountLoading = false;
    });
    builder.addCase(shouldPostFollowPubKeys.fulfilled, (state) => {
      state.followPubKeysLoading = false;
    });
    builder.addCase(shouldPostFollowPubKeys.pending, (state) => {
      state.followPubKeysLoading = true;
    });
    builder.addCase(shouldPostFollowPubKeys.rejected, (state) => {
      state.followPubKeysLoading = false;
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
    builder.addCase(shouldGetMyInterests.fulfilled, (state, action) => {
      state.myInterestsLoading = false;
      state.myInterests = action.payload;
    });
    builder.addCase(shouldGetMyInterests.pending, (state) => {
      state.myInterestsLoading = true;
    });
    builder.addCase(shouldGetMyInterests.rejected, (state) => {
      state.myInterestsLoading = false;
    });
    builder.addCase(shouldUpdateMyInterests.fulfilled, (state, action) => {
      state.updatingMyInterests = false;
    });
    builder.addCase(shouldUpdateMyInterests.pending, (state) => {
      state.updatingMyInterests = true;
    });
    builder.addCase(shouldUpdateMyInterests.rejected, (state) => {
      state.updatingMyInterests = false;
    });
  },
});

export const { actions, reducer } = userSlice;
