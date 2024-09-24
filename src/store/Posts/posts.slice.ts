import { createSlice } from "@reduxjs/toolkit";
import { Note } from "@satlantis/api-client";

import {
  shouldFetchPosts,
  shouldLikePosts,
  shouldFetchPost,
  shouldPublishReply,
} from "./posts.thunks";

interface PostsState {
  likingPostLoading: boolean;
  postsLoading: boolean;
  posts: Note[];
  postLoading: boolean;
  publishReplyLoading: boolean;
}

const initialState: PostsState = {
  postsLoading: false,
  likingPostLoading: false,
  posts: [],
  postLoading: false,
  publishReplyLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    logout: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldFetchPosts.fulfilled, (state, action) => {
      state.postsLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(shouldFetchPosts.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(shouldFetchPosts.rejected, (state) => {
      state.postsLoading = false;
    });
    builder.addCase(shouldLikePosts.fulfilled, (state) => {
      state.likingPostLoading = false;
    });
    builder.addCase(shouldLikePosts.pending, (state) => {
      state.likingPostLoading = true;
    });
    builder.addCase(shouldLikePosts.rejected, (state) => {
      state.likingPostLoading = false;
    });
    builder.addCase(shouldFetchPost.fulfilled, (state, action) => {
      const updatedPost = state.posts.map((post) =>
        post.id === action.payload.id ? { ...post, ...action.payload } : post,
      );
      state.posts = updatedPost;
      state.postLoading = false;
    });
    builder.addCase(shouldFetchPost.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(shouldFetchPost.rejected, (state) => {
      state.postLoading = false;
    });
    builder.addCase(shouldPublishReply.fulfilled, (state) => {
      state.publishReplyLoading = false;
    });
    builder.addCase(shouldPublishReply.pending, (state) => {
      state.publishReplyLoading = true;
    });
    builder.addCase(shouldPublishReply.rejected, (state) => {
      state.publishReplyLoading = false;
    });
  },
});

export const { actions, reducer } = postsSlice;
