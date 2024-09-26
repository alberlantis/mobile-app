import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../tools";
import { splitArrayIntoEqualParts } from "src/utils";

const selectUser = (store: RootState) => store.regular.user;
export const selectOtherUserAccount = (store: RootState) =>
  selectUser(store).otherUserAccount;
export const selectMyAccount = (store: RootState) => selectUser(store).account;
export const selectAccount = (isOwnAccount: boolean) => (store: RootState) => {
  return isOwnAccount ? selectMyAccount(store) : selectOtherUserAccount(store);
};
export const selectInterestsPool = (store: RootState) =>
  selectUser(store).interestsPool;
export const selectInterestsMap = createSelector(
  selectInterestsPool,
  (interests) => {
    const allInterests: Map<string, string[]> = new Map(
      interests
        .filter(
          (interest) =>
            !!interest.recommendationsByNpub &&
            !!interest.recommendationsByNpub.length,
        )
        .map(
          (interest) =>
            [interest.name, interest.recommendationsByNpub] as [
              string,
              string[],
            ],
        ),
    );
    return allInterests;
  },
);
export const selectInterestsPoolLoading = (store: RootState) =>
  selectUser(store).interestsPoolLoading;
export const selectInterestsNameWithId = createSelector(
  selectInterestsPool,
  (pool) => {
    return pool.map((item) => ({ name: item.name, id: item.id }));
  },
);
export const selectSanitizeInterestsPool = createSelector(
  selectInterestsNameWithId,
  (pool) => {
    return splitArrayIntoEqualParts(pool, 3);
  },
);
export const selectUserHomeProfile = (isOwnAccount: boolean) =>
  createSelector(selectAccount(isOwnAccount), (account) => {
    return {
      banner: account?.banner || "",
      name: account?.name || "",
      email: account?.email || "",
      totalFollowers: account?.followedBy?.length || 0,
      totalFollowing: account?.following?.length || 0,
      isUser: !!account ? !account.isBusiness : false,
      isBusiness: !!account ? account.isBusiness : false,
      avatar: account?.picture,
      website: account?.website || "",
      nostrUsername: account?.nip05,
      id: account?.id,
      about: account?.about || "",
      phone: account?.phone || "",
      interests: !!account && !!account.interests ? account.interests : [],
    };
  });
export const selectUserFollowers =
  (isOwnAccount: boolean) => (store: RootState) =>
    selectAccount(isOwnAccount)(store)?.followedBy;
export const selectUserFollowing =
  (isOwnAccount: boolean) => (store: RootState) =>
    selectAccount(isOwnAccount)(store)?.following;
export const selectIsUserFollowingFollower = (followerId: number | undefined) =>
  createSelector(selectMyAccount, (account) => {
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
  selectMyAccount,
  (account) => ({
    npub: account?.npub || "",
    pubKey: account?.pubKey || "",
  }),
);
export const selectUpdateAccountLoading = (store: RootState) =>
  selectUser(store).updateAccountLoading;
export const selectFollowPubKeysLoading = (store: RootState) =>
  selectUser(store).followPubKeysLoading;
export const selectUpdateCompleteProfileLoading = (store: RootState) =>
  selectUser(store).updateCompleteProfileLoading;
