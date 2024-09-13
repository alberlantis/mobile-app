import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AuthClient, UserClient } from "src/client";
import * as Nostr from "./Nostr";
import * as Profile from "./Profile";
import * as Auth from "./Auth";
import * as User from "./User";

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
    api: {
      AuthClient: typeof AuthClient;
      UserClient: typeof UserClient;
    };
    actions: {
      auth: typeof Auth.actions;
      user: typeof User.actions;
      nostr: typeof Nostr.actions;
      profile: typeof Profile.actions;
    };
  };
}>();
