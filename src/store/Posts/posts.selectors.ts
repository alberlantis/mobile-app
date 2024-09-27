import { createSelector } from "@reduxjs/toolkit";
import { Note } from "@satlantis/api-client";

import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import { splitArrayBySize, splitUrlAndText } from "src/utils";
import type { RootState } from "../tools";

export interface Posts extends Note {
  imageUrl: string;
  description: string;
  url: string;
}

function formatPosts(post: Note): Posts {
  const [imageUrl, description] = splitUrlAndText(post.content);
  const postUrl = `${EXPO_PUBLIC_DOMAIN}/p/${post.account.npub}?note=${post.id}`;
  return {
    ...post,
    imageUrl,
    description,
    url: postUrl,
  };
}

const selectPostsState = (store: RootState) => store.regular.posts;
export const selectPostsLoading = (store: RootState) =>
  selectPostsState(store).postsLoading;
export const selectRawPosts = (store: RootState) => {
  return selectPostsState(store).posts;
};
export const selectPosts = createSelector(selectRawPosts, (posts) =>
  posts.map((post) => formatPosts(post)),
);
export const selectSinglePost = (postId: number) =>
  createSelector(selectPosts, (posts) => {
    return posts.find((post) => post.id === postId);
  });

export const selectFilteredPosts = createSelector(selectPosts, (posts) => {
  return posts.filter((post) => {
    const tags: string[] = JSON.parse(post.tags);
    if (!tags) return true;
    return tags.every((tag) => tag[0] !== "e");
  });
});
export const selectSanitizePosts = createSelector(
  selectFilteredPosts,
  (posts) => {
    const sanitizePosts = splitArrayBySize(posts, 3);
    return sanitizePosts;
  },
);
export const selectPostLoading = (store: RootState) =>
  selectPostsState(store).postLoading;
export const selectPublishReplyLoading = (store: RootState) =>
  selectPostsState(store).publishReplyLoading;
export const selectLikingPostLoading = (store: RootState) =>
  selectPostsState(store).likingPostLoading;
export const selectIsUserLikePost = (
  userId: number | undefined,
  postId: number,
) =>
  createSelector(selectSinglePost(postId), (post) => {
    if (!userId || !post) return false;
    return post.reactions.some((reaction) => reaction.accountId === userId);
  });
