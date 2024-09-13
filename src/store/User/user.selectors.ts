import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../tools";
import { splitArrayIntoEqualParts } from "src/utils";

const selectUser = (store: RootState) => store.regular.user;
const selectAccount = (store: RootState) => selectUser(store).account;

export const selectInterestsPool = (store: RootState) =>
  selectUser(store).interestsPool;
export const selectInterestsPoolLoading = (store: RootState) =>
  selectUser(store).interestsPoolLoading;
export const selectSanitizeInterestsPool = createSelector(
  selectInterestsPool,
  (pool) => {
    const options = pool.map((item) => item.name);
    return splitArrayIntoEqualParts(options, 3);
  },
);
export const selectUserHomeProfile = createSelector(
  selectAccount,
  (account) => {
    return {
      banner: account?.banner || "",
      displayName: account?.displayName || "",
      email: account?.email || "",
      totalFollowers: account?.followedBy?.length || 0,
      totalFollowing: account?.following?.length || 0,
      isUser: !!account ? !account.isBusiness : false,
      isBusiness: !!account ? account.isBusiness : false,
      avatar: account?.picture,
      website: account?.website,
      nostrUsername: account?.nip05,
      id: account?.id,
    };
  },
);
export const selectUserFollowers = (store: RootState) =>
  selectAccount(store)?.followedBy;
export const selectUserFollowing = (store: RootState) =>
  selectAccount(store)?.following;
export const selectIsUserFollowingFollower = (followerId: number | undefined) =>
  createSelector(selectAccount, (account) => {
    if (!account || !followerId) return false;
    return !!account.following?.find((item) => item.id === followerId);
  });
export const selectGetAccountLoading = (store: RootState) =>
  selectUser(store).getAccountLoading;
export const selectFollowUserLoading = (store: RootState) =>
  selectUser(store).followUserLoading;
export const selectUnfollowUserLoading = (store: RootState) =>
  selectUser(store).unfollowUserLoading;
export const selectUserPublicKeys = createSelector(
  selectAccount,
  (account) => ({
    npub: account?.npub || "",
    pubKey: account?.pubKey || "",
  }),
);
