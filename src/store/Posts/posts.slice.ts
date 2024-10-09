import { createSlice } from "@reduxjs/toolkit";
import { Note } from "@satlantis/api-client";

import {
  shouldLikePosts,
  shouldFetchPost,
  shouldPublishReply,
} from "./posts.thunks";

interface PostsState {
  post:
    | {
        itself: Note;
        descendants: Note[];
      }
    | undefined;
  likingPostLoading: boolean;
  postLoading: boolean;
  publishReplyLoading: boolean;
}

const initialState: PostsState = {
  likingPostLoading: false,
  post: undefined,
  postLoading: false,
  publishReplyLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    logout: (state) => {
      state.post = undefined;
    },
  },
  extraReducers: (builder) => {
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
      state.post = action.payload;
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
