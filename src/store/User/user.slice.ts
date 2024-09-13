import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interest, Account } from "@satlantis/api-client";

import { shouldFetchAllInterests } from "./user.thunks";

interface UserState {
  interestsPool: Interest[];
  interestsPoolLoading: boolean;
  account: Account | undefined;
}

const initialState: UserState = {
  interestsPool: [],
  interestsPoolLoading: false,
  account: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    shouldSetAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shouldFetchAllInterests.fulfilled, (state, action) => {
      state.interestsPoolLoading = false;
      state.interestsPool = action.payload;
    });
    builder.addCase(shouldFetchAllInterests.pending, (state) => {
      state.interestsPoolLoading = true;
    });
    builder.addCase(shouldFetchAllInterests.rejected, (state) => {
      state.interestsPoolLoading = false;
    });
  },
});

export const { actions, reducer } = userSlice;
