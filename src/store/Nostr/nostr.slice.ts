import { createSlice } from "@reduxjs/toolkit";

import { shouldGenerateSigner } from "./nostr.thunks";

interface NostrState {
  privateKey: string | undefined;
  generateSignerLoading: boolean;
}

const initialState: NostrState = {
  privateKey: undefined,
  generateSignerLoading: false,
};

const nostrSlice = createSlice({
  name: "nostr",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shouldGenerateSigner.fulfilled, (state, action) => {
      state.generateSignerLoading = false;
      state.privateKey = action.payload;
    });
    builder.addCase(shouldGenerateSigner.pending, (state) => {
      state.generateSignerLoading = true;
    });
    builder.addCase(shouldGenerateSigner.rejected, (state) => {
      state.generateSignerLoading = false;
    });
  },
});

export const { actions, reducer } = nostrSlice;
