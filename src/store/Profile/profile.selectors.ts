import { createSelector } from "@reduxjs/toolkit";

import type { ImagePool } from "mock/profile/image-pool-client";
import type { RootState } from "../tools";

export const selectProfilePosts = (store: RootState) => store.profile.posts;
export const selectProfilePostsLoading = (store: RootState) =>
  store.profile.postsLoading;
export const selectProfileType = (store: RootState) =>
  store.profile.profileType; // @tech only for test
export const selectIsOwnProfile = (store: RootState) =>
  store.profile.isOwnProfile; // @tech only for test
export const selectIsProfileBusiness = createSelector(
  selectProfileType,
  (type) => type === "business",
); // @tech only for test
export const selectIsProfileUser = createSelector(
  selectProfileType,
  (type) => type === "user",
); // @tech only for test

export type SanitizePosts = {
  id: string;
  data: ImagePool[];
};
export const selectSanitizePosts = createSelector(
  selectProfilePosts,
  (posts) => {
    if (!posts?.length) return;
    return Array.from({ length: Math.ceil(posts.length / 3) }, (...[, i]) => ({
      id: `row-${i}`,
      data: posts.slice(i * 3, i * 3 + 3),
    }));
  },
);
