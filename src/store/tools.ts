import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import * as Nostr from "./Nostr";
import * as Profile from "./Profile";
import * as Auth from "./Auth";
import * as User from "./User";
import * as Posts from "./Posts";

import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: {
    actions: {
      auth: { thunks: typeof Auth.thunks; actions: typeof Auth.actions };
      user: { thunks: typeof User.thunks; actions: typeof User.actions };
      nostr: { thunks: typeof Nostr.thunks; actions: typeof Nostr.actions };
      profile: {
        thunks: typeof Profile.thunks;
        actions: typeof Profile.actions;
      };
      posts: { thunks: typeof Posts.thunks; actions: typeof Posts.actions };
    };
  };
}>();
