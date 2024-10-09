import { createSelector } from "@reduxjs/toolkit";
import { AccountPlaceRoleTypeEnum } from "@satlantis/api-client";

import type { RootState } from "../tools";
import { splitArrayIntoEqualParts } from "src/utils";

const selectUser = (store: RootState) => store.user;

export const selectMyProfile = (store: RootState) =>
  selectUser(store).myProfile;
export const selectMyProfileLoading = (store: RootState) =>
  selectUser(store).myProfileLoading;
export const selectFollowings = (store: RootState) =>
  selectUser(store).followings;
export const selectFollowers = (store: RootState) =>
  selectUser(store).followedBy;
export const selectRoles = (store: RootState) => selectUser(store).myRoles;
export const selectMyAccount = (store: RootState) =>
  selectUser(store).myAccount;

export const selectIsAmbassador = createSelector(selectRoles, (roles) => {
  if (!roles.length) return false;
  return roles[0].type === AccountPlaceRoleTypeEnum.AMBASSADOR;
});

export const selectInterestsPool = (store: RootState) =>
  selectUser(store).interestsPool;
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

export const selectUpdateInterestsLoading = (store: RootState) =>
  selectUser(store).updateInterestsLoading;
export const selectUpdateMyProfileLoading = (store: RootState) =>
  selectUser(store).updateMyProfileLoading;
export const selectUpdateCompleteProfileLoading = (store: RootState) =>
  selectUser(store).updateCompleteProfileLoading;

export const selectIsUserFollowingFollower = (
  followingId: number | undefined,
) =>
  createSelector(selectFollowings, (followings) => {
    if (!followings.length || !followingId) return false;
    return followings.some(
      // @ts-ignore ALBERT: Please add id type into metaData object
      (following) => following.metaData.id === followingId,
    );
  });
export const selectFollowUserLoading = (store: RootState) =>
  selectUser(store).followUserLoading;
export const selectUnfollowUserLoading = (store: RootState) =>
  selectUser(store).unfollowUserLoading;
