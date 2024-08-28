import { createSelector } from "@reduxjs/toolkit";

import type { ImagePool } from "mock/profile/image-pool-client";
import type { RootState } from "../tools";

export const getProfilePosts = (store: RootState) => store.profile.posts;
export const getProfilePostsLoading = (store: RootState) =>
  store.profile.postsLoading;

export type SanitizePosts = {
  id: string;
  data: ImagePool[];
};
export const getSanitizePosts = createSelector(getProfilePosts, (posts) => {
  if (!posts?.length) return;
  return Array.from({ length: Math.ceil(posts.length / 3) }, (...[, i]) => ({
    id: `row-${i}`,
    data: posts.slice(i * 3, i * 3 + 3),
  }));
});
