import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ImagePool } from "mock/profile/image-pool-client";
import { shouldFetchProfilePosts } from "./profile.thunks";

type ProfileType = "user" | "business"; // @tech only for test
interface ProfileState {
  postsLoading: boolean;
  posts: ImagePool[];
  profileType: ProfileType; // @tech only for test
  isOwnProfile: boolean; // @tech only for test
}

const initialState: ProfileState = {
  postsLoading: false,
  posts: [],
  profileType: "user", // @tech only for test
  isOwnProfile: true, // @tech only for test
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    shouldChangeProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profileType = action.payload;
    }, // @tech only for test
    shouldToggleOwnProfile: (state, action: PayloadAction<boolean>) => {
      state.isOwnProfile = action.payload;
    }, // @tech only for test
  },
  extraReducers: (builder) => {
    builder.addCase(shouldFetchProfilePosts.fulfilled, (state, action) => {
      state.postsLoading = false;
      state.posts = [...state.posts, ...action.payload];
    });
    builder.addCase(shouldFetchProfilePosts.pending, (state, action) => {
      state.postsLoading = true;
    });
    builder.addCase(shouldFetchProfilePosts.rejected, (state, action) => {
      state.postsLoading = false;
    });
  },
});

export const { actions, reducer } = profileSlice;
