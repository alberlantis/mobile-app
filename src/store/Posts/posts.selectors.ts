import type { RootState } from "../tools";

const selectPostsState = (store: RootState) => store.posts;

export const selectPost = (store: RootState) => selectPostsState(store).post;
export const selectPostLoading = (store: RootState) =>
  selectPostsState(store).postLoading;

export const selectPublishReplyLoading = (store: RootState) =>
  selectPostsState(store).publishReplyLoading;
export const selectLikingPostLoading = (store: RootState) =>
  selectPostsState(store).likingPostLoading;
