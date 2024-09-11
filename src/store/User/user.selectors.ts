import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../tools";
import { splitArrayIntoEqualParts } from "src/utils";

const selectUser = (store: RootState) => store.regular.user;

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
