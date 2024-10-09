import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { shouldGenerateSigner } from "./nostr.thunks";

interface NostrState {
  privateKey: string | undefined;
  generateSignerLoading: boolean;
  token: string;
  isTokenExpired: boolean;
}

const initialState: NostrState = {
  privateKey: undefined,
  generateSignerLoading: false,
  token: "",
  isTokenExpired: false,
};

const nostrSlice = createSlice({
  name: "nostr",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.isTokenExpired = false;
    },
    shouldUpdateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    shouldUpdatePrivateKey: (state, action: PayloadAction<string>) => {
      state.privateKey = action.payload;
    },
    shouldSetTokenExpired: (state) => {
      state.isTokenExpired = true;
    },
  },
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
