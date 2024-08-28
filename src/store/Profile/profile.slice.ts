import { createSlice } from "@reduxjs/toolkit";

import type { ImagePool } from "mock/profile/image-pool-client";
import { shouldFetchProfilePosts } from "./profile.thunks";

interface ProfileState {
  postsLoading: boolean;
  posts: ImagePool[];
}

const initialState: ProfileState = {
  postsLoading: false,
  posts: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
