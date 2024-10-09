import { createSelector } from "@reduxjs/toolkit";
import { AccountPlaceRoleTypeEnum } from "@satlantis/api-client";

import type { RootState } from "../tools";

const selectProfileState = (store: RootState) => store.profile;

export const selectProfile = (store: RootState) =>
  selectProfileState(store).otherProfile;
export const selectProfileLoading = (store: RootState) =>
  selectProfileState(store).profileLoading;
export const selectRoles = (store: RootState) =>
  selectProfileState(store).roles;

export const selectIsAmbassador = createSelector(selectRoles, (roles) => {
  if (!roles.length) return false;
  return roles[0].type === AccountPlaceRoleTypeEnum.AMBASSADOR;
});
